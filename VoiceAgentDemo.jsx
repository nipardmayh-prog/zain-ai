// =============================================================
// AutoCommentReply — Fake social post with AI auto-replies
// =============================================================
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

const commentTemplates = {
  default: [
    { user: 'Sarah K.', text: 'How much does this cost?', reply: 'Hi Sarah! Starting at $497/mo. I just sent you a DM with details! 🚀' },
    { user: 'Mike R.', text: 'Is this available for my industry?', reply: 'Absolutely Mike! We serve 12+ industries. Check your DMs — sent you a quick guide! 📩' },
    { user: 'Emily T.', text: 'I need this for my business!', reply: 'Amazing Emily! 🎉 I just DMd you a free consultation link. Let\'s get you set up!' },
    { user: 'James L.', text: 'Does it work with my CRM?', reply: 'Yes James! We integrate with 50+ CRMs. I\'ll DM you the full list! ✅' },
    { user: 'Priya M.', text: 'Can I try it free?', reply: 'Of course Priya! 14-day free trial — check your DMs for the signup link! 🎁' },
  ],
  restaurant: [
    { user: 'FoodLover22', text: 'What time do you close?', reply: 'We\'re open till 10pm tonight! Want me to book you a table? 🍽️' },
    { user: 'Chef_Maria', text: 'Do you do catering?', reply: 'Yes! Catering from $500. Just DMd you our full menu! 🎉' },
    { user: 'DateNight_Dan', text: 'Table for 2 Saturday?', reply: 'Got you covered Dan! Just reserved 7:30pm. Check your DMs! 📅' },
  ],
  gym: [
    { user: 'FitJake', text: 'What are membership prices?', reply: 'Starting at $29/mo! First month FREE. Check your DMs for details! 💪' },
    { user: 'YogaRachel', text: 'Do you have yoga classes?', reply: 'Yes! Daily yoga at 6am & 7pm. I just DMd you the full schedule! 🧘' },
    { user: 'Runner_Sam', text: 'Free trial?', reply: 'Absolutely! 7-day free pass — sent to your DMs! Come try us out! 🏃' },
  ],
  clinic: [
    { user: 'HealthyMom', text: 'Do you accept BCBS?', reply: 'Yes we do! All major insurance accepted. DMd you our list! ✅' },
    { user: 'Patient_101', text: 'How do I book?', reply: 'Super easy! Just DMd you our booking link — takes 30 seconds! 📅' },
  ],
  realestate: [
    { user: 'HomeBuyer23', text: 'Any 3BR listings?', reply: 'We have 8 matching listings! Just DMd you the top picks! 🏡' },
    { user: 'Investor_K', text: 'What\'s the ROI in downtown?', reply: 'Avg 7.2% cap rate! I DMd you a full market analysis! 📊' },
  ],
};

export default function AutoCommentReply() {
  const { aiEnabled, selectedIndustry } = useStore();
  const [comments, setComments] = useState([]);
  const [capturedLeads, setCapturedLeads] = useState(0);
  const intervalRef = useRef(null);
  const indexRef = useRef(0);

  const templates = commentTemplates[selectedIndustry] || commentTemplates.default;

  useEffect(() => {
    if (!aiEnabled) {
      clearInterval(intervalRef.current);
      return;
    }

    setComments([]);
    indexRef.current = 0;
    setCapturedLeads(0);

    const addComment = () => {
      const template = templates[indexRef.current % templates.length];
      const commentId = Date.now();

      // Add user comment
      setComments(prev => [...prev, {
        id: commentId,
        type: 'user',
        user: template.user,
        text: template.text,
      }]);

      // Add AI reply after delay
      setTimeout(() => {
        setComments(prev => [...prev, {
          id: commentId + 1,
          type: 'ai',
          user: 'ZAIN AI',
          text: template.reply,
        }]);
        setCapturedLeads(prev => prev + 1);
      }, 1200 + Math.random() * 800);

      indexRef.current++;
    };

    addComment();
    intervalRef.current = setInterval(addComment, 5000 + Math.random() * 3000);

    return () => clearInterval(intervalRef.current);
  }, [aiEnabled, selectedIndustry]);

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-heading font-semibold text-lg">Auto Comment Reply</h3>
          <p className="text-gray-400 text-xs mt-0.5">AI captures leads from social comments</p>
        </div>
        {capturedLeads > 0 && (
          <motion.span
            key={capturedLeads}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="px-2.5 py-1 rounded-full bg-ai-500/15 border border-ai-500/25 text-ai-500 text-xs font-bold"
          >
            +{capturedLeads} leads captured
          </motion.span>
        )}
      </div>

      {/* Fake social post */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zn-500 to-ai-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">Z</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">ZAIN Agency</p>
            <p className="text-gray-500 text-[10px]">Sponsored · 2h</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-2">
          🚀 Want to automate your business with AI? Comment "INFO" below and our AI will DM you instantly!
        </p>
        <div className="flex gap-4 text-gray-500 text-xs pt-2 border-t border-white/5">
          <span>❤️ 2.4K</span>
          <span>💬 {comments.length}</span>
          <span>↗️ 847</span>
        </div>
      </div>

      {/* Comments section */}
      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {!aiEnabled && comments.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-600 text-sm">Enable AI to see auto-replies</p>
            </div>
          )}
          {comments.map(comment => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-2 p-2 rounded-lg ${
                comment.type === 'ai' ? 'bg-zn-500/5 border border-zn-500/10 ml-6' : ''
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${
                comment.type === 'ai'
                  ? 'bg-gradient-to-br from-zn-500 to-ai-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {comment.type === 'ai' ? 'Z' : comment.user[0]}
              </div>
              <div>
                <span className={`text-xs font-medium ${comment.type === 'ai' ? 'text-zn-400' : 'text-gray-300'}`}>
                  {comment.user}
                  {comment.type === 'ai' && <span className="ml-1 text-[9px] text-ai-500">⚡ AI</span>}
                </span>
                <p className="text-gray-400 text-xs mt-0.5">{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

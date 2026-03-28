"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, MapPin, Phone, CreditCard, Plus, Trash2, Edit3, Save, Loader2, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [cards, setCards] = useState([{ id: 1, brand: "VISA", last4: "4242" }]);
  const [formData, setFormData] = useState({
    name: "", phone: "", delivery_address: "", city: "", postal_code: "", profile_complete: false
  });

  // Derived State based on your exact column names
  const requiredFields = ['name', 'phone', 'delivery_address', 'city', 'postal_code'];
  const completedSteps = requiredFields.filter(field => !!formData[field]).length;
  const progressPercentage = (completedSteps / requiredFields.length) * 100;

  useEffect(() => {
    if (session) {
      fetch("/api/user/profile")
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error("Load error:", err));
    }
  }, [session]);

  const handleAction = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        const updatedData = await res.json();
        setFormData(updatedData);
        setIsEditing(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const deleteCard = (id) => setCards(cards.filter(card => card.id !== id));

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 relative text-black">
      
      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] border border-white/10"
          >
            <div className="bg-green-500 p-1.5 rounded-full"><CheckCircle size={18} /></div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Profile Saved</p>
            </div>
            <button onClick={() => setShowToast(false)}><X size={14} className="text-white/40" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-6">
        
        {/* HEADER DASHBOARD */}
        <div className="bg-white rounded-[32px] p-10 mb-8 shadow-sm border border-black/5">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-28 h-28 bg-black text-white rounded-full flex items-center justify-center font-cinzel text-4xl font-bold shadow-xl border-4 border-white">
              {formData.name?.charAt(0) || "A"}
            </div>

            <div className="flex-1 w-full space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="font-cinzel text-3xl font-bold uppercase tracking-widest">
                    {formData.name || "New Explorer"}
                  </h1>
                  <p className="text-black/40 text-sm font-bold uppercase tracking-widest mt-1">{session?.user?.email}</p>
                </div>

                <button 
                  onClick={handleAction}
                  disabled={saving}
                  className={`px-10 py-5 rounded-full text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-3 shadow-xl ${
                    isEditing 
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200' 
                      : 'bg-black text-white hover:bg-gray-800 shadow-black/20'
                  }`}
                >
                  {saving ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing...</>
                  ) : isEditing ? (
                    <><Save size={16} /> Save Changes</>
                  ) : (
                    <><Edit3 size={16} /> Edit Profile</>
                  )}
                </button>
              </div>

              {/* PROGRESS BAR */}
              <div className="pt-6 border-t border-black/5">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/40">Profile Setup</span>
                  <span className="text-[12px] font-bold tracking-widest">
                    {completedSteps} / 5 STEPS
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className={`h-full transition-colors duration-500 ${progressPercentage === 100 ? 'bg-green-500' : 'bg-[#966B4E]'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CONTACT INFO */}
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-black/5">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-black/5">
              <div className="p-2.5 bg-black text-white rounded-xl shadow-lg shadow-black/20"><User size={18} /></div>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.1em]">Contact Information</h2>
            </div>
            
            <div className="space-y-8">
               <div className="space-y-3">
                  <label className="text-[12px] font-bold text-black/40 uppercase tracking-[0.1em] ml-1">Full Name</label>
                  <input 
                    disabled={!isEditing}
                    value={formData.name || ""} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-4 rounded-xl text-sm border-2 transition-all outline-none ${
                      isEditing ? 'border-black bg-white ring-4 ring-black/5' : 'border-transparent bg-gray-50 text-gray-500'
                    }`}
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[12px] font-bold text-black/40 uppercase tracking-[0.1em] ml-1">Mobile Contact</label>
                  <input 
                    disabled={!isEditing}
                    value={formData.phone || ""} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className={`w-full p-4 rounded-xl text-sm border-2 transition-all outline-none ${
                      isEditing ? 'border-black bg-white ring-4 ring-black/5' : 'border-transparent bg-gray-50 text-gray-500'
                    }`}
                  />
               </div>
            </div>
          </div>

          {/* DELIVERY INFO */}
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-black/5">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-black/5">
              <div className="p-2.5 bg-black text-white rounded-xl shadow-lg shadow-black/20"><MapPin size={18} /></div>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.1em]">Delivery Details</h2>
            </div>
            <div className="space-y-8">
               <div className="space-y-3">
                  <label className="text-[12px] font-bold text-black/40 uppercase tracking-[0.1em] ml-1">Street Address</label>
                  <textarea 
                    disabled={!isEditing}
                    rows="1"
                    value={formData.delivery_address || ""} 
                    onChange={e => setFormData({...formData, delivery_address: e.target.value})}
                    className={`w-full p-4 rounded-xl text-sm border-2 transition-all outline-none resize-none ${
                      isEditing ? 'border-black bg-white ring-4 ring-black/5' : 'border-transparent bg-gray-50 text-gray-400'
                    }`}
                  />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-black/40 uppercase tracking-[0.1em] ml-1">City</label>
                    <input 
                      disabled={!isEditing}
                      value={formData.city || ""} 
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className={`w-full p-4 rounded-xl text-sm border-2 transition-all outline-none ${
                        isEditing ? 'border-black bg-white ring-4 ring-black/5' : 'border-transparent bg-gray-50 text-gray-500'
                      }`}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-black/40 uppercase tracking-[0.1em] ml-1">Postal Code</label>
                    <input 
                      disabled={!isEditing}
                      value={formData.postal_code || ""} 
                      onChange={e => setFormData({...formData, postal_code: e.target.value})}
                      className={`w-full p-4 rounded-xl text-sm border-2 transition-all outline-none ${
                        isEditing ? 'border-black bg-white ring-4 ring-black/5' : 'border-transparent bg-gray-50 text-gray-500'
                      }`}
                    />
                  </div>
               </div>
            </div>
          </div>
          {/* SAVED PAYMENTS SECTION */}
          <div className="mt-8 bg-white rounded-[28px] p-8 shadow-sm border border-black/5">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-black text-white rounded-xl shadow-lg shadow-black/20">
                  <CreditCard size={18} />
                </div>
                <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-black">Saved Payment Methods</h2>
              </div>
              <button className="text-[11px] font-bold text-[#966B4E] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition">
                <Plus size={16} /> Add New Card
              </button>
            </div>

            {/* Checking if the user has a tokenized card in the DB */}
            {!formData.payment_token ? (
              <div className="p-12 text-center border-2 border-dashed border-black/5 rounded-2xl">
                <p className="text-[11px] font-bold uppercase text-black/30 tracking-widest">No cards saved yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 border-2 border-gray-50 rounded-2xl flex items-center justify-between hover:border-black transition-all group cursor-default">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-10 bg-black rounded-lg flex items-center justify-center text-[10px] text-white font-black tracking-tighter uppercase">
                      {formData.card_brand || "Card"}
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-[0.3em]">•••• {formData.card_last4 || "4242"}</p>
                      <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest mt-1">Securely Tokenized</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {/* Add delete API logic here later */}} 
                    className="p-3 text-black/10 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
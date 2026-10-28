"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, MapPin, LogOut, Phone, CreditCard, Plus, Trash2, Edit3, Save, Loader2, CheckCircle, X, MessageSquarePlus, Star, Calendar, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


export default function AccountPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [orders, setOrders] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  
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

      fetch("/api/user/orders")
      .then(res => res.json())
      .then(data => setOrders(data));

      // Fetch User's Reviews
      fetch("/api/user/reviews")
        .then(res => res.json())
        .then(data => setUserReviews(data));
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
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[320px] border border-white/10"
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
            
            <div className="w-28 h-28 bg-black text-white rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-cinzel text-4xl font-bold shadow-xl ">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={formData.name || "Profile picture"}
                  width={256}
                  height={256}
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                formData.name?.charAt(0)?.toUpperCase() || "A"
              )}
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
                  className={`px-10 py-5 rounded-full text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-3  ${
                    isEditing 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-black text-white hover:bg-gray-800'
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
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="px-7 py-4 rounded-full border border-red-200 bg-white text-red-600 text-[12px] font-bold uppercase tracking-[0.1em] flex items-center gap-3 transition-all duration-300 hover:bg-red-50 hover:border-red-300 active:scale-95"
                >
                  <LogOut size={16} />
                  Log Out
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
              <div className="p-2.5 bg-black text-white rounded-xl"><User size={18} /></div>
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
              <div className="p-2.5 bg-black text-white rounded-xl"><MapPin size={18} /></div>
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
          
          
        </div>
        {/* NAVIGATION HUB */}
      <div className="flex flex-col gap-6 mt-8">
        
        {/* ORDERS NAVIGATION CARD */}
        <Link href="/account/orders">
          <motion.div 
            whileHover={{ scale: 1.01, borderColor: "rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.99 }}
            className="group bg-white rounded-[24px] p-8 border-2 border-black/5 flex items-center justify-between cursor-pointer transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-8">
              <div className="p-5 bg-black text-white rounded-2xl shadow-lg group-hover:bg-[#966B4E] transition-colors">
                <Calendar size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-cinzel text-xl font-bold uppercase tracking-[0.2em]">My Orders</h2>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-1">View your order history and tracking status</p>
              </div>
            </div>
            <div className="text-black/20 group-hover:text-black group-hover:translate-x-2 transition-all">
              <ExternalLink size={24} />
            </div>
          </motion.div>
        </Link>

        {/* REVIEWS NAVIGATION CARD */}
        <Link href="/account/reviews">
          <motion.div 
            whileHover={{ scale: 1.01, borderColor: "rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.99 }}
            className="group bg-white rounded-[24px] p-8 border-2 border-black/5 flex items-center justify-between cursor-pointer transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-8">
              <div className="p-5 bg-black text-white rounded-2xl shadow-lg group-hover:bg-[#966B4E] transition-colors">
                <MessageSquarePlus size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-cinzel text-xl font-bold uppercase tracking-[0.2em]">My Reviews</h2>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-1">Manage your feedback and ratings</p>
              </div>
            </div>
            <div className="text-black/20 group-hover:text-black group-hover:translate-x-2 transition-all">
              <ExternalLink size={24} />
            </div>
          </motion.div>
        </Link>

      </div>
      </main>
    </div>
  );
}
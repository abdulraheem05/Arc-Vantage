"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, MapPin, Phone, ShieldCheck, Edit3, CreditCard, Plus, Trash2, Check } from "lucide-react";

export default function AccountPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Mocking card state for UI functionality
  const [cards, setCards] = useState([
    { id: 1, brand: "VISA", last4: "4242" }
  ]);

  const [formData, setFormData] = useState({
    full_name: "", phone: "", delivery_address: "", city: "", postal_code: "", profile_complete: false
  });

  useEffect(() => {
    if (session) {
      fetch("/api/user/profile").then(res => res.json()).then(data => setFormData(data));
    }
  }, [session]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/user/profile", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();
    setFormData(prev => ({ ...prev, profile_complete: result.isComplete }));
    setIsEditing(false);
    setSaving(false);
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] pt-32 pb-20">
      <main className="max-w-5xl mx-auto px-6">
        
        {/* TOP BANNER / HEADER */}
        <div className="bg-white rounded-[24px] p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-sm border border-black/5">
          <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center font-cinzel text-3xl font-bold">
            {formData.full_name?.charAt(0) || "A"}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-cinzel text-2xl font-bold uppercase tracking-widest text-black">
              {formData.full_name || "New Explorer"}
            </h1>
            <p className="text-black/50 text-[12px] font-bold uppercase tracking-[0.1em] mt-1">{session?.user?.email}</p>
            
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
               <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${formData.profile_complete ? 'bg-green-50 border-green-200 text-green-700' : 'bg-orange-50 border-orange-200 text-orange-700'}`}>
                 {formData.profile_complete ? <Check size={12}/> : <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />}
                 {formData.profile_complete ? "Profile Complete" : "Incomplete Profile"}
               </div>
               <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="px-6 py-2 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black/80 transition flex items-center gap-2"
               >
                 <Edit3 size={12} /> {isEditing ? "Cancel" : "Edit Profile"}
               </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CONTACT INFO CARD */}
          <div className="bg-white rounded-[24px] p-8 shadow-sm border border-black/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-black/5 rounded-lg"><User size={18} /></div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Contact Details</h2>
            </div>
            
            <div className="space-y-6">
               <div className="relative">
                  <label className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 block">Full Name</label>
                  <input 
                    disabled={!isEditing}
                    value={formData.full_name || ""} 
                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                    className={`w-full p-4 rounded-xl text-sm transition-all border ${isEditing ? 'bg-white border-black shadow-sm' : 'bg-gray-50 border-transparent text-gray-500'}`}
                    placeholder="Enter your full name"
                  />
               </div>
               <div>
                  <label className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 block">Mobile Number</label>
                  <input 
                    disabled={!isEditing}
                    value={formData.phone || ""} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className={`w-full p-4 rounded-xl text-sm transition-all border ${isEditing ? 'bg-white border-black shadow-sm' : 'bg-gray-50 border-transparent text-gray-500'}`}
                    placeholder="+94 7X XXX XXXX"
                  />
               </div>
            </div>
          </div>

          {/* SHIPPING INFO CARD */}
          <div className="bg-white rounded-[24px] p-8 shadow-sm border border-black/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-black/5 rounded-lg"><MapPin size={18} /></div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Delivery Address</h2>
            </div>
            <div className="space-y-6">
               <div>
                  <label className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 block">Address</label>
                  <textarea 
                    disabled={!isEditing}
                    rows="1"
                    value={formData.delivery_address || ""} 
                    onChange={e => setFormData({...formData, delivery_address: e.target.value})}
                    className={`w-full p-4 rounded-xl text-sm transition-all border ${isEditing ? 'bg-white border-black shadow-sm' : 'bg-gray-50 border-transparent text-gray-500'} resize-none`}
                    placeholder="Street, House No, etc."
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 block">City</label>
                    <input 
                      disabled={!isEditing}
                      value={formData.city || ""} 
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className={`w-full p-4 rounded-xl text-sm transition-all border ${isEditing ? 'bg-white border-black shadow-sm' : 'bg-gray-50 border-transparent text-gray-500'}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 block">Postal Code</label>
                    <input 
                      disabled={!isEditing}
                      value={formData.postal_code || ""} 
                      onChange={e => setFormData({...formData, postal_code: e.target.value})}
                      className={`w-full p-4 rounded-xl text-sm transition-all border ${isEditing ? 'bg-white border-black shadow-sm' : 'bg-gray-50 border-transparent text-gray-500'}`}
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="mt-8 bg-white rounded-[24px] p-8 shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 rounded-lg"><CreditCard size={18} /></div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Saved Payment Methods</h2>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:underline">
              <Plus size={14} /> Add New Card
            </button>
          </div>

          {cards.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-black/5 rounded-2xl">
                <p className="text-[11px] font-bold uppercase text-black/30 tracking-widest">No cards saved yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map(card => (
                <div key={card.id} className="p-6 border border-black/10 rounded-2xl flex items-center justify-between hover:border-black transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center text-[8px] text-white font-bold">{card.brand}</div>
                    <div>
                      <p className="text-sm font-bold tracking-[0.2em]">•••• {card.last4}</p>
                      <p className="text-[9px] text-black/40 font-bold uppercase">Expires 12/28</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteCard(card.id)}
                    className="p-2 text-black/20 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SAVE BUTTON */}
        {isEditing && (
          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-8 py-5 bg-black text-white rounded-[16px] font-bold uppercase text-[12px] tracking-[0.3em] hover:opacity-90 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-3"
          >
            {saving ? "Processing..." : "Save Profile Details"}
          </button>
        )}
      </main>
    </div>
  );
}
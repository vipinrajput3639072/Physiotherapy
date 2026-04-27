import React, { useState, useRef } from "react";
import {
  Send,
  Search,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Image as ImageIcon,
} from "lucide-react";

const PatientMessages = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef(null);

  // Mock initial data
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Sarah Wilson", text: "How is your knee feeling after yesterday's session?", time: "09:30 AM", isMe: false },
    { id: 2, sender: "Me", text: "It's a bit sore, but the range of motion has definitely improved!", time: "10:05 AM", isMe: true },
    { id: 3, sender: "Dr. Sarah Wilson", text: "That's normal. Make sure to apply ice for 15 minutes today.", time: "10:10 AM", isMe: false },
  ]);

  const contacts = [
    { id: 0, name: "Dr. Sarah Wilson", role: "Lead Physiotherapist", status: "Online", image: "https://i.pravatar.cc/150?u=sarah" },
    { id: 1, name: "Reception Desk", role: "Scheduling", status: "Away", image: "https://i.pravatar.cc/150?u=recep" },
    { id: 2, name: "James Miller", role: "Nutritionist", status: "Online", image: "https://i.pravatar.cc/150?u=james" },
  ];

  // 1. Handle Sending Messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Me",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setInputText(""); // Clear input
  };

  // 2. Handle Gallery/File Selection
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this to a server
      alert(`Selected file: ${file.name}`);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-md">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      {/* Sidebar: Chat List */}
      <div className="hidden md:flex w-80 border-r border-emerald-100 flex-col bg-emerald-50/30">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-emerald-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`w-full flex items-center gap-4 p-4 transition-all ${
                activeChat === contact.id ? "bg-white border-y border-emerald-100 shadow-sm" : "hover:bg-emerald-50/50"
              }`}
            >
              <div className="relative">
                <img src={contact.image} alt="" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.status === "Online" ? "bg-emerald-500" : "bg-slate-300"}`} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-bold text-slate-900 truncate">{contact.name}</p>
                <p className="text-xs text-slate-500 truncate">{contact.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-emerald-50 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-3">
            <img src={contacts[activeChat].image} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">{contacts[activeChat].name}</h3>
              <p className="text-xs text-emerald-600 font-medium">{contacts[activeChat].status}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"><Phone className="w-5 h-5" /></button>
            <button className="p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"><Video className="w-5 h-5" /></button>
            <button className="p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"><Info className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${msg.isMe ? "order-1" : "order-2"}`}>
                <div className={`p-4 rounded-2xl shadow-sm text-sm ${
                  msg.isMe ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-tr-none" : "bg-white border border-emerald-50 text-slate-800 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[10px] mt-1 font-bold text-slate-400 uppercase tracking-wider ${msg.isMe ? "text-right" : "text-left"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-emerald-50">
          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-transparent focus-within:border-emerald-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all">
            <button 
              type="button"
              onClick={handleFileClick}
              className="p-2 text-slate-400 hover:text-emerald-600"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-slate-700"
            />
            
            <button type="button" className="p-2 text-slate-400 hover:text-emerald-600">
              <Smile className="w-5 h-5" />
            </button>
            
            <button 
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-all shadow-md shadow-emerald-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientMessages;
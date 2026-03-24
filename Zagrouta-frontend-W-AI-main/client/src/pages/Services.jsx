import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { CustomSelect } from "../components/ui/CustomSelect";
// Mock data based on the HTML template
const SERVICES_DATA = [
    {
        id: 1,
        name: "قاعة الماسة",
        category: "venue",
        typeLabel: "قاعة",
        rating: "4.9",
        location: "مدينة نصر، القاهرة",
        priceLabel: "يبدأ من",
        price: "25,000 ج.م",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "فستان سندريلا",
        category: "dress",
        typeLabel: "فستان",
        rating: "4.5",
        location: "التجمع الخامس",
        priceLabel: "إيجار",
        price: "5,000 ج.م",
        image: "https://s.alicdn.com/@sc04/kf/Hb2a67e5d2fc74020b6f41f6cfa79265fT/Mumuleo-Pink-15-Party-Sexy-Red-Ball-Gown-Quinceanera-Dresses-3D-Bow-Design-Tulle-Formal-Cinderella-Birthday.jpg"
    },
    {
        id: 3,
        name: "سارة ميك أب",
        category: "makeup",
        typeLabel: "ميك أب",
        rating: "5.0",
        location: "المهندسين",
        priceLabel: "باكيدج زفاف",
        price: "3,500 ج.م",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "قاعة فيرونا",
        category: "venue",
        typeLabel: "قاعة",
        rating: "4.7",
        location: "المعادي، القاهرة",
        priceLabel: "يبدأ من",
        price: "15,000 ج.م",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        name: "أتيليه ليلة العمر",
        category: "dress",
        typeLabel: "فستان",
        rating: "4.8",
        location: "مصر الجديدة",
        priceLabel: "شراء",
        price: "12,000 ج.م",
        image: "https://images.unsplash.com/photo-1594553920272-9999c77e7d31?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        name: "نورا فوتوغرافي",
        category: "photography",
        typeLabel: "تصوير",
        rating: "4.9",
        location: "مدينة نصر",
        priceLabel: "جوفو",
        price: "4,000 ج.م",
        image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=500&q=60"
    }
];
export default function Services() {
    const [location] = useLocation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Initialize filters from URL params
    const searchParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
    
    const [priceLimit, setPriceLimit] = useState(() => {
        const budget = searchParams.get('budget');
        return budget ? parseInt(budget) : 100000;
    });
    
    const [selectedCategory, setSelectedCategory] = useState(() => {
        const category = searchParams.get('category');
        return category || "all";
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState({});

    const toggleFavorite = (e, id) => {
        e.preventDefault();
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    const filteredServices = useMemo(() => {
        return SERVICES_DATA.filter(service => {
            // Category filter
            if (selectedCategory !== "all" && service.category !== selectedCategory) {
                return false;
            }

            // Price filter (cleaning the price string "25,000 ج.م" to number)
            const priceValue = parseInt(service.price.replace(/[^\d]/g, ''));
            if (priceValue > priceLimit) {
                return false;
            }

            // Search query
            if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [selectedCategory, priceLimit, searchQuery]);
    return (<div className="container mx-auto px-4 py-8 flex-1">
      <button onClick={toggleFilter} className="md:hidden w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl mb-6 flex items-center justify-center gap-2 shadow-sm">
        <span>⚙️</span> تصفية النتائج
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-sm h-fit border border-gray-100 sticky top-24`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">البحث المتقدم</h2>
            <button onClick={toggleFilter} className="md:hidden text-gray-400">✕</button>
          </div>

          <div className="mb-6 relative">
            <input 
              type="text" 
              placeholder="اسم القاعة، الفستان..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border  rounded-xl focus:ring-2 focus:ring-[#8c71af] focus:outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-sm text-gray-500 uppercase">القسم</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/20 border border-transparent p-2 rounded-lg transition">
                <input 
                  type="radio" 
                  name="category" 
                  className="accent-pink-600 w-5 h-5 focus:ring-[#8c71af]" 
                  checked={selectedCategory === "all"}
                  onChange={() => setSelectedCategory("all")}
                />
                <span className="font-bold text-gray-700">الكل</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/20 border border-transparent p-2 rounded-lg transition">
                <input 
                  type="radio" 
                  name="category" 
                  className="accent-pink-600 w-5 h-5 focus:ring-[#8c71af]"
                  checked={selectedCategory === "venue"}
                  onChange={() => setSelectedCategory("venue")}
                />
                <span className="font-bold text-gray-700">قاعات أفراح</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/20 border border-transparent p-2 rounded-lg transition">
                <input 
                  type="radio" 
                  name="category" 
                  className="accent-pink-600 w-5 h-5 focus:ring-[#8c71af]"
                  checked={selectedCategory === "dress"}
                  onChange={() => setSelectedCategory("dress")}
                />
                <span className="font-bold text-gray-700">فساتين زفاف</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/20 border border-transparent p-2 rounded-lg transition">
                <input 
                  type="radio" 
                  name="category" 
                  className="accent-pink-600 w-5 h-5 focus:ring-[#8c71af]"
                  checked={selectedCategory === "makeup"}
                  onChange={() => setSelectedCategory("makeup")}
                />
                <span className="font-bold text-gray-700">ميك أب آرتيست</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/20 border border-transparent p-2 rounded-lg transition">
                <input 
                  type="radio" 
                  name="category" 
                  className="accent-primary w-5 h-5 focus:ring-[#8c71af]"
                  checked={selectedCategory === "photography"}
                  onChange={() => setSelectedCategory("photography")}
                />
                <span className="font-bold text-gray-700">تصوير</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-3 text-sm text-gray-500 uppercase">الحد الأقصى للسعر</h3>
            
            <input type="range" className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4" min="1000" max="100000" step="500" value={priceLimit} onChange={(e) => setPriceLimit(parseInt(e.target.value))}/>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold text-sm">أقصى سعر:</span>
              <input type="number" className="w-full p-2 border border-gray-300 rounded-lg text-gradient-primary font-bold text-center focus:ring-2 focus:ring-[#8c71af] outline-none" value={priceLimit} onChange={(e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val))
                val = 1000;
            if (val > 100000)
                val = 100000;
            if (val < 1000)
                val = 1000;
            setPriceLimit(val);
        }}/>
              <span className="text-gray-400 font-bold text-sm">ج.م</span>
            </div>
          </div>

          <button className="w-full bg-gradient-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg">تطبيق الفلتر</button>
        </aside>

        {/* Main Content */}
        <section className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">أحدث العروض <span className="text-gradient-primary text-sm font-bold ml-2">({filteredServices.length} نتيجة)</span></h1>
            <div className="w-48">
              <CustomSelect 
                defaultValue="الأحدث"
                options={["الأحدث", "الأقل سعراً", "الأعلى تقييماً"]}
                className="bg-white border text-gray-700 font-bold p-2.5 rounded-lg text-sm focus:ring-1 focus:ring-[#8c71af] hover:border-[#8c71af] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (<div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-gray-100 flex flex-col">
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={service.name}/>
                  <span className="absolute top-3 right-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">{service.typeLabel}</span>
                  <button onClick={(e) => toggleFavorite(e, service.id)} className="absolute top-3 left-3 bg-white/50 hover:bg-white p-2 rounded-full transition text-red-500">
                    {favorites[service.id] ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-l group-hover:from-blue-900 group-hover:via-[#8c71af] group-hover:to-pink-300 transition">{service.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">⭐ {service.rating}</div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">📍 {service.location}</p>
                  <div className="mt-auto flex justify-between items-center border-t pt-4">
                    <div>
                      <span className="block text-xs text-gray-400">{service.priceLabel}</span>
                      <span className="font-bold text-gradient-primary text-lg">{service.price}</span>
                    </div>
                    <Link href={`/services/${service.id}`} className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gradient-to-br hover:from-blue-900 hover:to-[#8c71af] transition shadow hover:shadow-md transform hover:-translate-y-0.5">
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </div>))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">مفيش نتائج مطابقة</h3>
                <p className="text-gray-500">جربي تغيري فلاتر البحث أو اختاري أقسام تانية.</p>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-center gap-2 font-bold">
            <button className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/30 hover-text-gradient-primary flex items-center justify-center text-gray-500 transition">‹</button>
            <button className="w-10 h-10 rounded-lg bg-gradient-primary text-white font-bold flex items-center justify-center shadow-lg transform hover:-translate-y-0.5 transition">1</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/30 hover-text-gradient-primary flex items-center justify-center text-gray-500 transition">2</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/30 hover-text-gradient-primary flex items-center justify-center text-gray-500 transition">3</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 hover:border-border/30 hover-text-gradient-primary flex items-center justify-center text-gray-500 transition">›</button>
          </div>
        </section>
      </div>
    </div>);
}

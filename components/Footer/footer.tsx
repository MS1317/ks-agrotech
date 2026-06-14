import React, { useState, useEffect } from "react";
import style from "./footer.module.css";
import { createClient } from "../../lib/supabase/client";

// Footer data configuration
const footerData = {
  information: {
    title: "About K.S. Agrotech",
    description: "K.S. Agrotech is a leading manufacturer of agricultural pulleys in Sahnewal, Punjab. We specialize in V belt pulleys, thresher pulleys, reaper pulleys, combine pulleys, bush type pulley, cam pulley, and mudloader pulley.",
    links: []
  },
  contact: {
    title: "Contact Us",
    phone: "+91 9815248682, +91 9915360666, 0161-2990966",
    email: "ksagrotech5@gmail.com",
    address: "Gurdev Industrial Estate near Leeford Healthcare, Sahnewal, Punjab 141206"
  },
  workingHours: {
    title: "Working hours",
    schedule: [
      { day: "Monday", hours: "9am - 6pm" },
      { day: "Tuesday", hours: "9am - 6pm" },
      { day: "Wednesday", hours: "9am - 6pm" },
      { day: "Thursday", hours: "9am - 6pm" },
      { day: "Friday", hours: "9am - 6pm" },
      { day: "Sat-Sun", hours: "9am - 6pm" }
    ]
  },
  copyright: {
    text: "© 2026 K.S. Agrotech. All rights reserved."
  }
};

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('products').select('category');
      if (data) {
        const uniqueCategories = Array.from(new Set(data.map(item => item.category).filter(Boolean)));
        setCategories(uniqueCategories);
      }
    };
    fetchCategories();
  }, [supabase]);

  return (
    <footer className={style.footer}>
      <div className={`${style.container} w-full max-w-7xl mx-auto px-4 lg:px-8`}>
        <div className={style.footerContent}>
          {/* Information Section */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>{footerData.information.title}</h3>
            <p className={style.description}>
              {footerData.information.description}
            </p>
          </div>

          {/* Contact Section */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>{footerData.contact.title}</h3>
            <ul className={style.linkList}>
              <li className={style.linkItem}>
                <a href={`tel:+919815248682`} className={style.link}>
                  📞 +91 9815248682
                </a>
              </li>
              <li className={style.linkItem}>
                <a href={`tel:+919915360666`} className={style.link}>
                  📞 +91 9915360666
                </a>
              </li>
              <li className={style.linkItem}>
                <a href={`tel:01612990966`} className={style.link}>
                  📞 0161-2990966
                </a>
              </li>
              <li className={style.linkItem}>
                <a href={`mailto:${footerData.contact.email}`} className={style.link}>
                  ✉️ {footerData.contact.email}
                </a>
              </li>
              <li className={style.linkItem}>
                <span className={style.link}>
                  📍 {footerData.contact.address}
                </span>
              </li>
              <li className={style.linkItem}>
                <span className={style.link}>
                  📄 GSTIN: 03XXXXX0000X0XX (Applied)
                </span>
              </li>
            </ul>
          </div>

          {/* Categories Section - Dynamic from products */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>Our Products</h3>
            <ul className={style.linkList}>
              {categories.map((category, index) => (
                <li key={index} className={style.linkItem}>
                  <a href="/products" className={style.link}>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours Section */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>{footerData.workingHours.title}</h3>
            <ul className={style.scheduleList}>
              {footerData.workingHours.schedule.map((item, index) => (
                <li key={index} className={style.scheduleItem}>
                  <span className={style.day}>{item.day}:</span>
                  <span className={style.hours}>{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={style.copyright}>
          <p className={style.copyrightText}>{footerData.copyright.text}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
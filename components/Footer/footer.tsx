import React, { useState, useEffect } from "react";
import style from "./footer.module.css";
import Image from "next/image";
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
    phone: "+91 9915360666",
    email: "ksagrotech5@gmail.com",
    address: "Sahnewal, Punjab, India"
  },
  workingHours: {
    title: "Working hours",
    schedule: [
      { day: "Monday", hours: "8am - 7pm" },
      { day: "Tuesday", hours: "8am - 7pm" },
      { day: "Wednesday", hours: "8am - 7pm" },
      { day: "Thursday", hours: "8am - 7pm" },
      { day: "Friday", hours: "8am - 7pm" },
      { day: "Sat-Sun", hours: "Off" }
    ]
  },
  copyright: {
    text: "© 2024 K.S. Agrotech. All rights reserved."
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
  }, []);

  return (
    <footer className={style.footer}>
      <div className={style.container}>
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
                <a href={`tel:${footerData.contact.phone}`} className={style.link}>
                  📞 {footerData.contact.phone}
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
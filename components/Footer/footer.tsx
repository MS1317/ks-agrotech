import React from "react";
import style from "./footer.module.css";
import Image from "next/image";

// Footer data configuration
const footerData = {
  information: {
    title: "Information",
    description: "Also, all the demo images are collected from Unsplash. If you want to use those, you may need to provide necessary credits. Please visit Unsplash for details.",
    links: [
      { text: "Unsplash", url: "https://unsplash.com" }
    ]
  },
  categories: {
    title: "Our Categories",
    links: [
      { text: "Our Products", url: "/products" },
      { text: "Our Services", url: "/services" },
      { text: "About Us", url: "/about" },
      { text: "Contact", url: "/contact" },
      { text: "FAQs", url: "/faqs" }
    ]
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
  photos: {
    title: "Photos",
    images: [
      "/images/Footer/g1.jpg",
      "/images/Footer/g1.jpg",
      "/images/Footer/g1.jpg",
      "/images/Footer/g1.jpg",
    ]
  },
  copyright: {
    text: "Created with ❤️ by TechiTuber"
  }
};

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.footerContent}>
          {/* Information Section */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>{footerData.information.title}</h3>
            <p className={style.description}>
              {footerData.information.description.split('Unsplash')[0]}
              <a href={footerData.information.links[0].url} className={style.link}>
                Unsplash
              </a>
              {footerData.information.description.split('Unsplash')[2]}
              <a href={footerData.information.links[0].url} className={style.link}>
                Unsplash
              </a>
              {footerData.information.description.split('Unsplash')[3]}
            </p>
          </div>

          {/* Categories Section */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>{footerData.categories.title}</h3>
            <ul className={style.linkList}>
              {footerData.categories.links.map((link, index) => (
                <li key={index} className={style.linkItem}>
                  <a href={link.url} className={style.link}>
                    {link.text}
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

          {/* Photos Section */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>{footerData.photos.title}</h3>
            <div className={style.photoGrid}>
              {footerData.photos.images.map((image, index) => (
                <div key={index} className={style.photoItem}>
                  <Image
                    src={image}
                    alt={`Gallery photo ${index + 1}`}
                    className={style.photo}
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </div>
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
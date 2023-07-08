

import './Map.css';

const Map = props => {
   

  return (
  <>
   <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28969.58848008409!2d66.96205960704441!3d24.82288239001621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb316201ec81f17%3A0xfb7d6d51d138c380!2sKiamari%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1688621342780!5m2!1sen!2s"
    className='map-preview'
    style={{ border: 0 }}
    // allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
  </>
  );
};

export default Map;

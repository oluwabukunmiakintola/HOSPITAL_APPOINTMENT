import React from "react";
import AboutImg from "../../assets/AboutUs.png";

const About = () => {
  return (
    <div className=" my-3 overflow-hidden">
      <div className="text-center pt-2">
        <p className="mt-5 fw-bold" style={{ color: "#008080"  }}>
          ABOUT <span>US</span>
        </p>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img src={AboutImg} alt="About Us" className="img-fluid " />
        </div>
        <div className="col-12 col-md-6 p-5" >
          <p>
            At Trinity Care Hospital, we are dedicated to providing exceptional
            healthcare services to our community. Established in 2010, our
            hospital has a rich history of delivering compassionate and
            comprehensive medical care. Our state-of-the-art facility is
            equipped with the latest technology, ensuring that our patients
            receive the highest standard of treatment.
          </p>
          <p>
            Our team of experienced healthcare professionals, including skilled
            doctors, nurses, and support staff, is committed to patient-centered
            care. We prioritize the well-being and comfort of our patients,
            fostering an environment of trust and respect. We offer a wide range
            of services, including emergency care, specialized surgeries,
            maternity care, and outpatient services, tailored to meet the
            diverse needs of our patients. Our focus on continuous improvement
            and innovation drives us to stay at the forefront of medical
            advancements.
          </p>

          <b style={{ color: "#008080"  }}>Our Vision</b>

          <p>
            At Trinity Care Hospital, our vision is to be a leading healthcare provider recognized for excellence in patient care, innovation, and community engagement. We aspire to create a healthier future for our community by delivering compassionate, high-quality medical services that are accessible to all.
          </p>
        </div>
      </div>

      <div className="my-4 container">
        <p style={{ color: "#008080"  }}>WHY <span>CHOOSE US</span> </p>
      </div>

    <div className="container my-5">
  <div className="row">
    <div className="col-12 col-md-4 mb-4">
      <div className="d-flex flex-column border px-3 py-4 custom-hover-bg">
        <b>Efficiency:</b>
        <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
      </div>
    </div>

    <div className="col-12 col-md-4 mb-4">
      <div className="d-flex flex-column border px-3 py-4 custom-hover-bg">
        <b>Convenience:</b>
        <p>Access to a network of trusted healthcare professionals in your area.</p>
      </div>
    </div>

    <div className="col-12 col-md-4 mb-4">
      <div className="d-flex flex-column border px-3 py-4 custom-hover-bg">
        <b>Personalization:</b>
        <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default About;

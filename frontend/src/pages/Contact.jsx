import React, { useState } from "react";
import { handleComingSoon } from "../utils/comingSoon";

function Contact() {
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    setLoading(true);
    handleComingSoon(event);
    setLoading(false);
  };
  return (
    <section>
      <div className="px-4 mx-auto max-w-(--breakpoint-md)">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text_para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know!
        </p>
        <form className="space-y-8" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="form_label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className="form_input mt-1"
            />
          </div>
          <div>
            <label htmlFor="subject" className="form_label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="form_input mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form_label">
              Your Message
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              placeholder="Leave a comment..."
              className="form_input mt-1"
            />
          </div>
          <button
            disabled={loading && true}
            type="submit"
            className="btn rounded-sm sm:w-fit mt-1"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

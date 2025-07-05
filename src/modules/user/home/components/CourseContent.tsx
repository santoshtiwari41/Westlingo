import React from "react";

const IELTS_CONTENT = `
<h2><strong>Studying abroad</strong></h2><p>Millions of students study abroad every year. If you want to study in a country where English is spoken, such as Australia, Canada, New Zealand, the UK, or the USA, IELTS could be the key to your future.</p><p>Gain valuable experience, attend world-class institutions, and boost your chances of employment by studying abroad.</p><p>Our IELTS Academic tests are recognised by over 12500 colleges, universities and professional bodies, including those in non-English-speaking countries where courses are taught in English.</p><div class='callout'><strong>Key Fact:</strong> IELTS is accepted by over 12,500 institutions worldwide!</div><p>We make it easy for you to share your test results with the institutions you've applied to so you can secure your place and future success.</p><h2><strong>Working abroad</strong></h2><p>Employers and professional bodies around the world rely on IELTS to help them select the right people.</p><p>Taking an IELTS test can boost your chances of employment as it shows your employer that you are committed to working and living in the country.</p><h3><strong>Which industries ask for IELTS?</strong></h3><p>Having an IELTS score may be necessary for registration with professional bodies in sectors where English-language competence is critical to the work.</p><p>Many professional registration bodies representing healthcare accept IELTS and they cover jobs in nursing, medicine, and pharmacy. Required proficiency levels vary between organisations and professions, by country and by jurisdiction. It is up to individual professional registration bodies to determine the IELTS band score and test type (Academic or General Training) they require.</p><p>Other professional bodies that may require an IELTS result include those in accounting, engineering, law and veterinary practice. Employers in finance, government, construction, energy, aviation and tourism may also require IELTS.</p><p>Find out which professional bodies accept IELTS</p><blockquote><strong>With IELTS, the world is a smaller place. I sat the test before leaving Japan and received a band score of 8.5, satisfying visa requirements.</strong><br/>Pavel, employee, large accounting firm, Australia</blockquote><blockquote><strong>The IELTS test opened the door for me.</strong><br/>Harritapak Kiratisaevee, Bangkok, Thailand; graduated from University of Liverpool (UK)</blockquote>
`;

const CourseContent = () => (
  <div
    className="prose dark:prose-invert mb-6 max-w-none text-zinc-800 dark:text-zinc-100"
    dangerouslySetInnerHTML={{ __html: IELTS_CONTENT }}
    style={
      {
        "--tw-prose-blockquote-bg": "#f3f4f6",
        "--tw-prose-blockquote-border": "#a78bfa",
      } as React.CSSProperties
    }
  />
);

export default CourseContent;

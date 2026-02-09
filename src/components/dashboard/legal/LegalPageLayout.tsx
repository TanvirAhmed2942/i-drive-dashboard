"use client";
import { useParams } from 'next/navigation';
import TermsAndContions from './TermsAndCon';
import AboutUs from './AboutUs';
import PrivacyPolicy from './PrivacyPolicy';
import FaqsLayout from './Faq';

function LegalPageLayout() {
    const { slug } = useParams();
    console.log(slug);
    return (

        <LegalPageContent slug={slug as string} />

    )
}

export default LegalPageLayout

const LegalPageContent = ({ slug }: { slug: string | undefined }) => {
    if (slug === "terms-and-conditions") {
        return <TermsAndContions />
    } else if (slug === "privacy-policy") {
        return <PrivacyPolicy />
    } else if (slug === "about-us") {
        return <AboutUs />
    } else if (slug === "faqs") {
        return <FaqsLayout />
    }
}
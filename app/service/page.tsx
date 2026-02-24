import DraggableGallery from '@/components/gallery';
import GroupLogo from '@/components/group-logo';
import TextAnimation from '@/components/text-animation';

export default function Service() {
    return (
        <div className="w-full bg-white font-sans text-gray-900 overflow-x-hidden">
            <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 mb-20">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                    <div className="w-full md:w-5/12">
                        <p className="text-xl md:text-3xl text-gray-800  mb-8">
                            Experience our expert solutions tailored to enhance your business with top-tier design, development, and animation.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-6 rounded-full transition-colors focus:outline-3 focus:outline-blue-600/30">
                            Services
                        </button>
                    </div>

                    <div className='w-full md:w-1/2 flex flex-col items-end gap-6 md:gap-8'>
                        <TextAnimation word1="UI & UX" word2="Development" word3="Blockchain" delay={0} />
                        <TextAnimation word1="Development" word2="UI & UX" word3="Blockchain" delay={0.8} />
                        <TextAnimation word1="Blockchain" word2="Development" word3="UI & UX" delay={0.6} />
                    </div>
                </div>
            </div>

            <DraggableGallery />

            <div className="max-w-6xl mx-auto px-6 pb-16 md:pb-24 text-center">
                <p className="text-sm font-semibold text-gray-600 mb-10">Our Partners</p>
                <GroupLogo/>
                
            </div>

        </div>
    );
}
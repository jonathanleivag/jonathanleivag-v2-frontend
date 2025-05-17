import type {FC} from "react";
import {useStore} from "@nanostores/react";
import {educationAll, personalData, professionalProfile, technologiesAll, works} from "../../store.ts";
import {getENV} from "../../utils/env.util.ts";
import {ENV} from "../../enum.ts";
import type {CvSharedComponentProps} from "../../type";

const CvSharedComponent:FC<CvSharedComponentProps> = ({cvRef}) => {
    const $personalData = useStore(personalData)
    const $professionalProfile =  useStore(professionalProfile)
    const $works = useStore(works)
    const $technologiesAll = useStore(technologiesAll)
    const $educationAll = useStore(educationAll)

    return <div ref={cvRef} className="p-6 font-sans bg-white">
        <div className="mt-8 bg-white text-black p-10 rounded-lg max-w-3xl mx-auto border border-gray-200 print:border-0 print:shadow-none">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{$personalData.name}</h1>
                <div className="w-20 h-1 bg-indigo-600 mx-auto mb-3"></div>
                <p className="text-gray-600 text-lg">{$personalData.profession}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-3">
                    <span>{getENV(ENV.PUBLIC_WEB)}</span>
                    <span>|</span>
                    <span>{getENV(ENV.PUBLIC_EMAIL)}</span>
                    <span>|</span>
                    <span>{getENV(ENV.PUBLIC_PHONE)}</span>
                </div>
            </header>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-indigo-700 border-b border-indigo-200 pb-2 mb-3">
                    Perfil Profesional
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    {$professionalProfile.content}
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-indigo-700 border-b border-indigo-200 pb-2 mb-3">
                    Resumen de Experiencia
                </h2>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-indigo-700">+{$professionalProfile.experience}</div>
                        <p className="text-gray-700">Años de Experiencia</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-700">{$professionalProfile.specialties}</div>
                        <p className="text-gray-700">Tecnologías Dominadas</p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-indigo-700 border-b border-indigo-200 pb-2 mb-3">
                    Experiencia
                </h2>
                {$works.map(work => (
                    <div key={work.name} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500 mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-gray-800">{work.name}</p>
                                <p className="italic text-indigo-600">{work.jobTitle}</p>
                            </div>
                            <span className="text-sm text-gray-500">{work.dateStart} - {work.dateEnd ? work.dateEnd : 'Actual'} </span>
                        </div>
                        <div className="mt-2 text-gray-700">
                          {work.skills?.map((skill, index) => (
                            <span key={`${work.name}-${skill}-${index}`}>
                              {skill}
                              {index < ((work.skills?.length ?? 0) - 1) && (
                                <span className="mx-2 text-gray-400">•</span>
                              )}
                            </span>
                          ))}
                        </div>
                    </div>
                ))}

            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-indigo-700 border-b border-indigo-200 pb-2 mb-3">
                    Tecnologías
                </h2>
                <div className="flex flex-wrap gap-2">
                    {$technologiesAll.map((tech) => (
                        <span
                            key={tech.name}
                            className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-indigo-700 border-b border-indigo-200 pb-2 mb-3">
                    Educación
                </h2>

                {$educationAll.slice(0,2).map((education) => (
                    <div key={education.establishment + education.degree} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800">
                            <strong>{education.establishment}</strong> – {education.degree}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{education.dateStart} - {education.dateEnd}</p>
                    </div>
                ))}

            </section>

            <footer className="text-center mt-10 text-xs text-gray-400 border-t border-gray-100 pt-4">
                CV generado desde jonathanleivag.cl
            </footer>
        </div>
    </div>
}

export default CvSharedComponent

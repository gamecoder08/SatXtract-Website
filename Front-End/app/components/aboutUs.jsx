import React from 'react'

const aboutUs = () => {
    return (
        <div className='flex flex-row gap-50 items-center justify-center mt-20'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src="/assets/devs/debasish.jpg"
                        alt="Debasish Ray" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Debasish Ray</h2>
                    <div className="flex flex-row gap-4 mt-2">
                        <a href="https://github.com/debasishray16" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/assets/icons/github.svg"
                                alt="GitHub"
                                className="w-7 h-7 night:invert"
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/debasishray1/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/assets/icons/linkedin.svg"
                                alt="LinkedIn"
                                className="w-7 h-7 night:invert"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src="/assets/devs/utkarsh.jpg"
                        alt="Utkarsh Raj Sinha"
                        />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Utkarsh Raj Sinha</h2>
                    <div className="flex flex-row gap-4 mt-2">
                        <a href="https://github.com/gamecoder08" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/assets/icons/github.svg"
                                alt="GitHub"
                                className="w-7 h-7 night:invert"
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/utkarsh-raj-sinha/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/assets/icons/linkedin.svg"
                                alt="LinkedIn"
                                className="w-7 h-7 night:invert"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default aboutUs
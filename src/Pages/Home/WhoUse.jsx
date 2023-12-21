

const WhoUse = () => {
    return (
        <div className="py-5 lg:py-10">
            <div className="px-5">
                <div className="py-5 space-y-3">
                    <h2 className="font-bold text-2xl lg:text-3xl text-center max-w-[650px] mx-auto"> Who can benefit from this?</h2>

                    <p className="text-base lg:text-lg text-center max-w-[550px] mx-auto">
                        Optimize Your Efficiency Using Our Time Management Resources.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 pt-10">
                    <div className="border p-6 pr-10 rounded-xl space-y-3">
                        <h2 className="text-xl font-bold">Developers</h2>
                        <p className="text-base">
                            Enhance coding and project management efficiency with our specialized tools, streamlining workflows and elevating overall productivity
                        </p>
                    </div>
                    <div className="border p-6 pr-10 rounded-xl space-y-3">
                        <h2 className="text-xl font-bold">Designers</h2>
                        <p className="text-base">
                            Optimize creativity by structuring design tasks, fostering a smooth workflow, and generating innovative results through organized processes.
                        </p>
                    </div>
                    <div className="border p-6 pr-10 rounded-xl space-y-3">
                        <h2 className="text-xl font-bold">Bankers</h2>
                        <p className="text-base">
                            Perfect time management for a seamless blend of financial analyses, client meetings, and administrative tasks to achieve balance.
                        </p>
                    </div>
                    <div className="border p-6 pr-10 rounded-xl space-y-3">
                        <h2 className="text-xl font-bold">Students</h2>
                        <p className="text-base">
                            Efficiently manage time for studies, assignments, and personal commitments to enhance productivity and achieve academic and personal goals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoUse;
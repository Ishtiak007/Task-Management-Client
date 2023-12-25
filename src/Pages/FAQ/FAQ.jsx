import img1 from '../../assets/image/faq1.jpg'
import img2 from '../../assets/image/faq2.jpg'


const FAQ = () => {
    return (
        <div className="p-5">
            <div className="hero min-h-screen bg-base-200">

                <div className="hero-content flex-col lg:flex-row">
                    <div className='lg:w-1/2 space-y-5 p-4'>
                        <h2 className="text-2xl font-bold text-white text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="join join-vertical w-full my-20">
                            <div className="collapse collapse-arrow join-item border border-[#ececec]">
                                <input type="radio" name="my-accordion-4" checked="checked" />
                                <div className="collapse-title font-bold text[#333]">
                                    What is project management
                                </div>
                                <div className="collapse-content">
                                    <p className="text-sm">
                                        Project management is a discipline that involves planning, organizing, and overseeing the execution of a project from its initiation to completion. The goal of project management is to achieve specific project objectives within the constraints of time, budget, scope, and quality. It encompasses a set of processes, skills, methods, and tools that project managers use to guide a project and its team to success.
                                    </p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border border-[#ececec]">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title font-bold text[#333]">
                                    How can we manage a project?
                                </div>
                                <div className="collapse-content">
                                    <p className="text-sm">
                                        Managing a project involves a systematic approach to ensure successful outcomes. Initially, define the project by outlining its objectives and scope while identifying key stakeholders and their expectations. Create a detailed project plan, encompassing timelines, budgets, resources, and tasks, breaking down the project into manageable phases. Assemble a competent team, clarifying roles and fostering effective communication. Implement risk management strategies to identify, assess, and mitigate potential challenges. Execute the plan, closely monitoring progress and employing control mechanisms to address deviations promptly. Emphasize quality management, setting standards for deliverables and conducting regular reviews. Upon completion, obtain stakeholder acceptance and conduct a thorough project review to document lessons learned. Maintain comprehensive documentation throughout the project and prioritize continuous improvement by applying insights to future endeavors. Stay adaptable to changes and engage stakeholders consistently, utilizing project management tools to enhance organization and communication.
                                    </p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border border-[#ececec]">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title font-bold text[#333]">
                                    How can we maintain time
                                </div>
                                <div className="collapse-content">
                                    <p className="text-sm">
                                        To maintain time effectively in project management, establish clear milestones and deadlines, creating a realistic schedule that considers the projects scope and potential challenges. Prioritize tasks based on urgency and importance, avoiding multitasking to ensure focused productivity. Regularly review and adjust the schedule, delegate tasks strategically, and utilize project management software for real-time tracking. Communicate expectations clearly, monitor time usage, and mitigate scope creep to prevent timeline extensions. Encourage time-tracking among team members for insightful data on resource allocation and task prioritization, fostering an environment of efficiency and accountability.
                                    </p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border border-[#ececec]">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title font-bold text[#333]">
                                    In the context of project management, what does the term Personal portfolio mean or refer to?
                                </div>
                                <div className="collapse-content">
                                    <p className="text-sm">
                                        In project management, a portfolio refers to a collection of projects or programs managed collectively to achieve strategic objectives. It involves the centralized management of various projects, considering their interdependencies and alignment with organizational goals. Portfolios provide a holistic view of an organizations project landscape, aiding in resource allocation, risk management, and decision-making. By grouping projects under a common portfolio, organizations can prioritize initiatives, optimize resource utilization, and ensure that the overall project mix aligns with strategic priorities, enhancing efficiency and effectiveness in achieving desired outcomes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2 relative'>
                        <img src={img1} className="w-3/4 rounded-lg shadow-2xl border-8  border-white " />
                        <img src={img2} className='w-1/2 absolute right-5 top-1/2 rounded-lg shadow-2xl' alt="" />
                    </div>
                </div>
            </div>





        </div>
    );
};

export default FAQ;
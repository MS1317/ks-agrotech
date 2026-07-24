import React from "react";
import { Settings, Users, FileText, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const Process = () => {
    return (
        <motion.section 
            className="bg-white py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
                {/* Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block">
                        <span className="text-blue-500 text-lg font-medium mb-2 block">Our Process</span>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-4"></div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800">How We Deliver Excellence</h2>
                </motion.div>

                {/* Process Steps */}
                <motion.div 
                    className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {/* Step 1 */}
                    <motion.div 
                        className="flex flex-col items-center text-center group"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <Settings className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    1
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Quality Materials</h3>
                        <p className="text-sm text-gray-600 mt-2 px-4">Sourcing only the finest grade materials for durability and performance.</p>
                    </motion.div>

                    {/* Arrow 1 */}
                    <motion.div 
                        className="hidden lg:block"
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <svg className="w-12 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                        </svg>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div 
                        className="flex flex-col items-center text-center group"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <Users className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    2
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Precision Engineering</h3>
                        <p className="text-sm text-gray-600 mt-2 px-4">State-of-the-art machinery ensuring exact specifications and tolerances.</p>
                    </motion.div>

                    {/* Arrow 2 */}
                    <motion.div 
                        className="hidden lg:block"
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <svg className="w-12 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                        </svg>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div 
                        className="flex flex-col items-center text-center group"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <FileText className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    3
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Quality Testing</h3>
                        <p className="text-sm text-gray-600 mt-2 px-4">Rigorous inspection to guarantee flawlessness in every product.</p>
                    </motion.div>

                    {/* Arrow 3 */}
                    <motion.div 
                        className="hidden lg:block"
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <svg className="w-12 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                        </svg>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div 
                        className="flex flex-col items-center text-center group"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <Wrench className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    4
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">On-Time Delivery</h3>
                        <p className="text-sm text-gray-600 mt-2 px-4">Reliable logistics to ensure your order arrives exactly when needed.</p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Process;
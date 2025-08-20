import React from "react";
import { Settings, Users, FileText, Wrench } from "lucide-react";

const Process = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block">
                        <span className="text-blue-500 text-lg font-medium mb-2 block">Easy Steps</span>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-4"></div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800">Working Process</h2>
                </div>

                {/* Process Steps */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <Settings className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    1
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Quality Driven</h3>
                    </div>

                    {/* Arrow 1 */}
                    <div className="hidden lg:block">
                        <svg className="w-12 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                        </svg>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <Users className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    2
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Customer Focused</h3>
                    </div>

                    {/* Arrow 2 */}
                    <div className="hidden lg:block">
                        <svg className="w-12 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                        </svg>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <FileText className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    3
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Detail Drawings</h3>
                    </div>

                    {/* Arrow 3 */}
                    <div className="hidden lg:block">
                        <svg className="w-12 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                        </svg>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 flex items-center justify-center relative transition-all duration-300 cursor-pointer">
                                <Wrench className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    4
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Grinding Machines</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
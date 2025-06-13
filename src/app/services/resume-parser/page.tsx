'use client'

import { useState, useRef, useEffect } from 'react'
import ServicesBackground from '@/app/components/ServicesBackground'
import UserHeader from '@/app/components/UserHeader'
import AIServicesHeader from '@/app/components/AIServicesHeader'
import { FiUpload, FiFile, FiX, FiCheck, FiClock, FiChevronRight, FiDownload } from 'react-icons/fi'
import { HiDocumentText } from 'react-icons/hi'

type ParsedResume = {
  id: string;
  fileName: string;
  parsedData: {
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
    };
    skills: string[];
    experience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
  };
  createdAt: string;
};

export default function ResumeParserPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState('');
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [history, setHistory] = useState<ParsedResume[]>([]);
  const [isLoadingHistory] = useState(false);
  const [historyError] = useState('');
  const [sidebarTab, setSidebarTab] = useState<'history' | 'tips'>('history');
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const parsedResumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parsedResume && parsedResumeRef.current) {
      parsedResumeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [parsedResume]);

  const isValidFile = (f: File) => {
    return (
      f.type === 'application/pdf' ||
      f.type === 'application/msword' ||
      f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      f.name.endsWith('.pdf') ||
      f.name.endsWith('.doc') ||
      f.name.endsWith('.docx')
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!isValidFile(selectedFile)) {
        setError('Please upload a PDF or Word document');
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
      setError('');
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      if (!isValidFile(droppedFile)) {
        setError('Please upload a PDF or Word document');
        return;
      }
      setFile(droppedFile);
      setError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleParse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsParsing(true);
    setError('');
    setParsedResume(null);

    try {
      const mockParsedResume: ParsedResume = {
        id: Date.now().toString(),
        fileName: file.name,
        parsedData: {
          contactInfo: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            location: "New York, NY"
          },
          skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python"],
          experience: [
            {
              company: "Tech Corp",
              position: "Senior Developer",
              duration: "2020 - Present",
              description: "Led development of enterprise applications"
            }
          ],
          education: [
            {
              institution: "University of Technology",
              degree: "Bachelor of Computer Science",
              year: "2016 - 2020"
            }
          ]
        },
        createdAt: new Date().toISOString()
      };

      setParsedResume(mockParsedResume);
      setHistory(prev => [mockParsedResume, ...prev]);
    } catch (err) {
      console.error("Resume parsing error:", err);
      setError('Failed to parse resume');
    } finally {
      setIsParsing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ServicesBackground>
      <UserHeader />

      <AIServicesHeader
        subtitle="📄 AI Resume Parser"
        title="Resume Analyzer"
        tagline="Extract insights from resumes automatically"
        description="Upload resumes in PDF or Word format to extract structured information and insights."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-xl flex items-center gap-3">
                <div className="flex-shrink-0 text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">{error}</div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <form onSubmit={handleParse} className="space-y-4 p-6">
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <HiDocumentText className="text-blue-500" />
                    Upload Resume
                  </label>
                  <div className="relative">
                    <div
                      className={`w-full px-4 py-8 rounded-xl border-2 border-dashed transition-colors duration-200 ${
                        file
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : isDragActive
                          ? 'border-blue-400 bg-blue-50/60 dark:bg-blue-900/10'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      style={{ cursor: 'pointer' }}
                      tabIndex={0}
                      aria-label="File drop area"
                    >
                      <div className="text-center">
                        {file ? (
                          <div className="flex items-center justify-center gap-3">
                            <FiFile className="w-8 h-8 text-blue-500" />
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {file.name}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setFile(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full bg-gray-100 dark:bg-gray-700"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <FiUpload className="w-8 h-8 text-gray-400 mx-auto" />
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {isDragActive ? (
                                <span>Drop your resume here...</span>
                              ) : (
                                <>
                                  Drag and drop your resume here, or{' '}
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                                  >
                                    browse
                                  </button>
                                </>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Supports PDF and Word documents
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isParsing || !file}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isParsing ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Parsing Resume...
                    </>
                  ) : (
                    <>
                      <HiDocumentText className="w-5 h-5" />
                      Parse Resume
                    </>
                  )}
                </button>
              </form>
            </div>

            {parsedResume && (
              <div ref={parsedResumeRef} className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        <FiCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Parsed Resume</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {parsedResume.fileName}
                        </p>
                      </div>
                    </div>
                    <button
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                      title="Download parsed data"
                    >
                      <FiDownload className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                          <p className="text-gray-900 dark:text-white">{parsedResume.parsedData.contactInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-white">{parsedResume.parsedData.contactInfo.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-gray-900 dark:text-white">{parsedResume.parsedData.contactInfo.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                          <p className="text-gray-900 dark:text-white">{parsedResume.parsedData.contactInfo.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {parsedResume.parsedData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Experience</h4>
                      <div className="space-y-4">
                        {parsedResume.parsedData.experience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-blue-500 pl-4">
                            <h5 className="font-medium text-gray-900 dark:text-white">{exp.position}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{exp.company}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Education</h4>
                      <div className="space-y-4">
                        {parsedResume.parsedData.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-blue-500 pl-4">
                            <h5 className="font-medium text-gray-900 dark:text-white">{edu.degree}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${sidebarTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-gray-50 dark:bg-gray-700/30' : 'text-gray-500 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                  onClick={() => setSidebarTab('history')}
                >
                  History
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${sidebarTab === 'tips' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-gray-50 dark:bg-gray-700/30' : 'text-gray-500 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                  onClick={() => setSidebarTab('tips')}
                >
                  Tips
                </button>
              </div>
              <div className="p-6 flex-1 flex flex-col min-h-[350px]" style={{ minHeight: '350px', maxHeight: '480px' }}>
                {sidebarTab === 'history' ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FiClock className="text-blue-500" />
                        Parse History
                      </h2>
                      {history.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          {history.length} items
                        </span>
                      )}
                    </div>
                    {isLoadingHistory ? (
                      <div className="flex flex-col items-center justify-center py-8 flex-1">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading history...</p>
                      </div>
                    ) : historyError ? (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-xl flex items-center gap-3 flex-1">
                        <div className="flex-shrink-0 text-red-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300">{historyError}</div>
                      </div>
                    ) : history.length === 0 ? (
                      <div className="text-center py-8 flex-1">
                        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <HiDocumentText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No parsed resumes yet</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Your parse history will appear here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: '260px' }}>
                        {history.map((item) => (
                          <div
                            key={item.id}
                            className="group p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                            onClick={() => setParsedResume(item)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                <FiFile className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {item.fileName}
                                  </h4>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                                    {formatDate(item.createdAt)}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                  {item.parsedData.contactInfo.name}
                                </p>
                                <div className="mt-2 flex items-center text-xs text-blue-600 dark:text-blue-400">
                                  <span className="truncate">{item.parsedData.contactInfo.email}</span>
                                  <FiChevronRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Resume Parsing Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>Use clear formatting with standard sections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>Include contact information at the top</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>List skills in a dedicated section</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>Use consistent date formats</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicesBackground>
  );
}
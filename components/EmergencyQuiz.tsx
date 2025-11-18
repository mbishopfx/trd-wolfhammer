'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BurstPipeIcon,
  LeakDetectorIcon,
  DrainIcon,
  WaterHeaterIcon,
  ToiletIcon,
  WrenchIcon,
  PhoneRingingIcon,
} from './icons';
import { BUSINESS_INFO } from '@/lib/constants';

const problemOptions = [
  { id: 'burst-pipe', label: 'Burst Pipe', icon: BurstPipeIcon },
  { id: 'leak', label: 'Water Leak', icon: LeakDetectorIcon },
  { id: 'clog', label: 'Clogged Drain', icon: DrainIcon },
  { id: 'no-hot-water', label: 'No Hot Water', icon: WaterHeaterIcon },
  { id: 'toilet', label: 'Toilet Issue', icon: ToiletIcon },
  { id: 'other', label: 'Other Problem', icon: WrenchIcon },
];

const urgencyOptions = [
  { id: 'emergency', label: 'Emergency Now!', color: 'bg-emergency' },
  { id: 'today', label: 'Need Help Today', color: 'bg-orange-500' },
  { id: 'this-week', label: 'This Week', color: 'bg-yellow-500' },
  { id: 'scheduled', label: 'Schedule Service', color: 'bg-success' },
];

const locationOptions = [
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'basement', label: 'Basement' },
  { id: 'outside', label: 'Outside' },
  { id: 'multiple', label: 'Multiple Areas' },
];

export const EmergencyQuiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState('');
  const [urgency, setUrgency] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'sms' | 'call'>('call');

  const handleSubmit = async () => {
    const problemLabel = problemOptions.find(p => p.id === problem)?.label || problem;
    const urgencyLabel = urgencyOptions.find(u => u.id === urgency)?.label || urgency;
    const locationLabel = locationOptions.find(l => l.id === location)?.label || location;

    const message = `EMERGENCY PLUMBING REQUEST

Problem Type: ${problemLabel}
Urgency: ${urgencyLabel}
Location: ${locationLabel}
Description: ${description || 'Not provided'}

Please contact me as soon as possible.`;

    // Save to database (but don't block the user experience)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Emergency Quiz Lead',
          email: 'quiz@pending.com', // Placeholder, we don't collect email in quiz
          phone: BUSINESS_INFO.phone, // Placeholder
          service: problemLabel,
          message: message,
          urgency: urgency,
          problem_type: problem,
          location_in_home: location,
          contact_preference: contactMethod,
        }),
      });
    } catch (error) {
      console.error('Failed to save lead:', error);
    }

    // Open contact method
    if (contactMethod === 'email') {
      window.location.href = `mailto:${BUSINESS_INFO.email}?subject=Emergency Plumbing Request - ${problemLabel}&body=${encodeURIComponent(message)}`;
    } else if (contactMethod === 'sms') {
      window.location.href = `sms:${BUSINESS_INFO.sms}?body=${encodeURIComponent(message)}`;
    } else {
      window.location.href = `tel:${BUSINESS_INFO.phone}`;
    }
  };

  const canProceed = () => {
    if (step === 1) return problem !== '';
    if (step === 2) return urgency !== '';
    if (step === 3) return location !== '';
    if (step === 4) return true; // Description is optional
    if (step === 5) return true; // Contact method has default value
    return false;
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-professional mb-2">
          Need Help Now?
        </h3>
        <p className="text-gray-600">Tell us your problem in 60 seconds</p>
        
        {/* Progress Bar */}
        <div className="mt-4 flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${
                s <= step ? 'bg-trust' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Step {step} of 5</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Problem Type */}
          {step === 1 && (
            <div>
              <h4 className="text-lg font-semibold text-professional mb-4">
                What type of problem are you experiencing?
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {problemOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setProblem(option.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        problem === option.id
                          ? 'border-trust bg-trust bg-opacity-10'
                          : 'border-gray-200 hover:border-trust'
                      }`}
                    >
                      <IconComponent size={32} className={problem === option.id ? 'text-trust' : 'text-gray-600'} />
                      <p className="text-sm font-medium mt-2">{option.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Urgency */}
          {step === 2 && (
            <div>
              <h4 className="text-lg font-semibold text-professional mb-4">
                How urgent is this issue?
              </h4>
              <div className="space-y-3">
                {urgencyOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setUrgency(option.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      urgency === option.id
                        ? 'border-professional bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${option.color}`} />
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h4 className="text-lg font-semibold text-professional mb-4">
                Where is the problem located?
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {locationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setLocation(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      location === option.id
                        ? 'border-trust bg-trust bg-opacity-10'
                        : 'border-gray-200 hover:border-trust'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Description */}
          {step === 4 && (
            <div>
              <h4 className="text-lg font-semibold text-professional mb-4">
                Can you describe the problem? (Optional)
              </h4>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Water is leaking from under the sink..."
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-trust outline-none min-h-32"
              />
            </div>
          )}

          {/* Step 5: Contact Method */}
          {step === 5 && (
            <div>
              <h4 className="text-lg font-semibold text-professional mb-4">
                How would you like us to reach you?
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => setContactMethod('call')}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    contactMethod === 'call'
                      ? 'border-trust bg-trust bg-opacity-10'
                      : 'border-gray-200 hover:border-trust'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <PhoneRingingIcon size={24} className="text-trust" />
                    <div className="text-left">
                      <p className="font-semibold">Call Me</p>
                      <p className="text-sm text-gray-600">Fastest response - call {BUSINESS_INFO.phone}</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setContactMethod('email')}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    contactMethod === 'email'
                      ? 'border-trust bg-trust bg-opacity-10'
                      : 'border-gray-200 hover:border-trust'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-semibold">Email Me</p>
                    <p className="text-sm text-gray-600">Send request via email</p>
                  </div>
                </button>

                <button
                  onClick={() => setContactMethod('sms')}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    contactMethod === 'sms'
                      ? 'border-trust bg-trust bg-opacity-10'
                      : 'border-gray-200 hover:border-trust'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-semibold">Text Me</p>
                    <p className="text-sm text-gray-600">Send request via text message</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}
        
        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all ${
              canProceed()
                ? 'bg-trust text-white hover:bg-trust-dark'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-emergency text-white rounded-full font-semibold hover:bg-emergency-dark transition-all transform hover:scale-105"
          >
            Submit Request
          </button>
        )}
      </div>
    </div>
  );
};


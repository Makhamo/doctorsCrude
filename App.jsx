import React, { useState, useEffect } from 'react';
import { FaUserMd, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctorID, setDoctorID] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;

  // Fetch doctors data
  const fetchDoctors = async () => {
    const response = await fetch('http://localhost:5000/api/doctor');
    const data = await response.json();
    setDoctors(data);
  };

  // Fetch users data
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5000/api/users');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchDoctors();
    fetchUsers();
  }, []);

  // Combine doctor and user data
  const combinedData = doctors.map(doctor => {
    const user = users.find(user => user.userId === doctor.userId);
    return {
      ...doctor,
      userFirstName: user ? user.firstName : 'Unknown',
      userLastName: user ? user.lastName : 'Unknown',
      userEmail: user ? user.email : 'Unknown',
    };
  });

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = combinedData.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const nextPage = () => {
    if (currentPage < Math.ceil(combinedData.length / doctorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handlers
  const handleEdit = (doctorId) => {
    console.log(`Edit doctor with ID: ${doctorId}`);
  };

  const handleDelete = (doctorId) => {
    console.log(`Delete doctor with ID: ${doctorId}`);
  };

  const handleActivate = (doctorId) => {
    console.log(`Activate doctor with ID: ${doctorId}`);
  };

  return (
    <div className='w-full h-screen overflow-hidden bg-white'>
      <h1 className='bg-blue-100 m-1 p-3 text-3xl font-bold text-gray-600 text-center rounded-xm shadow-purple-200'>
        Doctors
      </h1>
      <div className='p-3 bg-gray-100 rounded-lg m-2'>
        <div className='flex items-center space-x-4'>
          <h1 className='text-lg font-medium text-gray-700'>Search</h1>
          <div className='relative w-full max-w-xs'>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUserMd className="text-gray-500" />
            </span>
            <input
              id="doctorID"
              type="text"
              value={doctorID}
              onChange={(e) => setDoctorID(e.target.value)}
              placeholder="Enter Doctor ID"
              className="pl-10 py-2 w-full border mb-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out"
            />
          </div>
        </div>

        {/* Scrollable area with limited height */}
        <div className='overflow-x-auto overflow-y-auto max-h-[90vh] border rounded-lg border-gray-100 bg-slate-300 p-3 mb-3'>
          <div className='min-w-full flex'>
            {/* Sticky Names Column */}
            <div className='flex-shrink-0 min-w-32 bg-white sticky left-0 z-10'>
              <h1 className='border border-gray-300 p-2 bg-blue-500 font-semibold text-sm'>Names</h1>
              {currentDoctors.map(doctor => (
                <h1 key={doctor.userId} className='border border-gray-200 p-2 h-[6vh] bg-blue-100 text-sm font-bold'>
                  {doctor.userFirstName} {doctor.userLastName}
                </h1>
              ))}
            </div>

            {/* Scrollable Other Columns */}
            <div className='flex overflow-x-auto'>
              {/* Speciality Column */}
              <div className='flex-shrink-0 min-w-32'>
                <h1 className='border border-gray-300 p-2 bg-blue-200 font-semibold text-sm'>Speciality</h1>
                {currentDoctors.map(doctor => (
                  <h1 key={doctor.userId} className='border border-gray-200 p-2 h-[6vh] bg-blue-50 text-sm'>
                    {doctor.speciality}
                  </h1>
                ))}
              </div>

              {/* Email Column */}
              <div className='flex-shrink-0 min-w-32'>
                <h1 className='border border-gray-300 p-2 bg-blue-200 font-semibold text-sm'>Email</h1>
                {currentDoctors.map(doctor => (
                  <h1 key={doctor.userId} className='border border-gray-00 p-2 h-[6vh] bg-blue-50 text-sm'>
                    {doctor.userEmail}
                  </h1>
                ))}
              </div>

              {/* Phone Column */}
              <div className='flex-shrink-0 min-w-32'>
                <h1 className='border border-gray-300 p-2 bg-blue-200 font-semibold text-sm'>Phone</h1>
                {currentDoctors.map(doctor => (
                  <h1 key={doctor.userId} className='border border-gray-200 h-[6vh] p-2 bg-blue-50 text-sm'>
                    {doctor.practiceNumber}
                  </h1>
                ))}
              </div>

              {/* Active Status Column */}
              <div className='flex-shrink-0 min-w-32'>
                <h1 className='border border-gray-300 p-2 bg-blue-200 font-semibold text-sm'>Active</h1>
                {currentDoctors.map(doctor => (
                  <h1 key={doctor.userId} className='border border-gray-200 p-2 h-[6vh] bg-blue-50 text-sm'>
                    {doctor.isActive ? (
                      <FaCheckCircle className="text-green-500 " />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </h1>
                ))}
              </div>

              {/* Registration Fees Column */}
              <div className='flex-shrink-0 min-w-32'>
                <h1 className='border border-gray-300 p-2 bg-blue-200 font-semibold text-sm'>Registration Fees</h1>
                {currentDoctors.map(doctor => (
                  <h1 key={doctor.userId} className='border border-gray-200 p-2 h-[6vh] bg-blue-50 text-sm'>
                    {doctor.regFee}
                  </h1>
                ))}
              </div>

              {/* Consultation Fees Column */}
              <div className='flex-shrink-0 min-w-32'>
                <h1 className='border border-gray-300 p-2 bg-blue-200 font-semibold text-sm'>Consultation Fees</h1>
                {currentDoctors.map(doctor => (
                  <h1 key={doctor.userId} className='border border-gray-200 h-[6vh] p-2 bg-blue-50 text-sm'>
                    {doctor.consultFee}
                  </h1>
                ))}
              </div>

              {/* Edit Column */}
              <div className=''>
                <h1 className='border border-gray-300 p-2 bg-slate-200 font-semibold text-sm'>Edit</h1>
                {currentDoctors.map(doctor => (
                  <button
                    key={doctor.doctorId}
                    className='border border-green-300 p-2 bg-green-50 h-[6vh] rounded-md text-sm'
                    onClick={() => handleEdit(doctor.doctorId)}
                  >
                    Edit
                  </button>
                ))}
              </div>

              {/* Delete Column */}
              <div className=''>
                <h1 className='border border-gray-300 p-2 bg-slate-200 font-semibold text-sm'>Delete</h1>
                {currentDoctors.map(doctor => (
                  <button
                    key={doctor.doctorId}
                    className='border border-red-300 p-2 bg-red-50 rounded-md text-sm'
                    onClick={() => handleDelete(doctor.doctorId)}
                  >
                    Remove
                  </button>
                ))}
              </div>

              {/* Activate Column */}
              <div className=''>
                <h1 className='border border-gray-300 p-2 bg-slate-200 font-semibold text-sm'>Activate</h1>
                {currentDoctors.map(doctor => (
                  <button
                    key={doctor.doctorId}
                    className='border border-purple-300 p-2 bg-purple-50 rounded-md text-sm'
                    onClick={() => handleActivate(doctor.doctorId)}
                  >
                    Activate
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow text-sm"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-semibold">{`Page ${currentPage} of ${Math.ceil(combinedData.length / doctorsPerPage)}`}</span>
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow text-sm"
            disabled={currentPage === Math.ceil(combinedData.length / doctorsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;

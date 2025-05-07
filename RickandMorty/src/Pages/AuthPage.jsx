import {useState, useEffect, useContext} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../Context/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const {currentUser, login} = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (users.some((u) => u.username === formData.username)) {
      toast.error("Username already exists");
      return;
    }
    if (users.some((u) => u.email === formData.email)) {
      toast.error("Email already exists");
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    toast.success("Account created successfully!");
    setTimeout(() => {
      login({username: newUser.username, fullName: newUser.fullName});
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === formData.username);
    if (!user) {
      toast.error("User not found");
      return;
    }
    if (user.password !== formData.password) {
      toast.error("Incorrect password");
      return;
    }

    toast.success("Login successful!");
    login({username: user.username, fullName: user.fullName});
  };

  const formVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.3}},
    exit: {opacity: 0, y: -20, transition: {duration: 0.3}},
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 bg-[url('https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004856/starmap_random_2020_4k_print.jpg')] bg-cover bg-center">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden border-4 border-green-400">
        <div className="bg-gradient-to-r from-green-500 to-cyan-400 p-6 text-center relative">
          <div className="absolute inset-0 bg-opacity-20 bg-[url('https://placeholder.com/portal')] bg-cover bg-center mix-blend-overlay"></div>
          <h2 className="text-3xl font-extrabold text-white font-['Schwifty'] tracking-wider">{isLogin ? "Wubba Lubba Dub Dub!" : "Get Schwifty!"}</h2>
          <p className="text-yellow-300 mt-1 font-medium">{isLogin ? "Login to your dimension" : "Create a new identity"}</p>
          {isLogin && (
            <div className="w-full h-40 flex justify-center items-center">
              <svg className="w-32 h-32 text-green-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  initial={{pathLength: 0}}
                  animate={{pathLength: 1}}
                  transition={{duration: 5, repeat: Infinity, repeatType: "loop"}}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="p-6 bg-gray-800">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-green-400 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
                    placeholder="Enter your username"
                    required
                    autoComplete="Username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-green-400 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 font-bold shadow-lg shadow-green-500/50">
                  Portal In
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-cyan-300">
                  No interdimensional passport?{" "}
                  <button onClick={toggleAuthMode} className="text-yellow-300 hover:underline font-bold">
                    Create one now
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="signup" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="p-6 bg-gray-800">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-green-400 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-green-400 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-green-400 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
                    placeholder="Choose a username"
                    required
                    autoComplete="Username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-green-400 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-green-400 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                  />
                </div>

                <button type="submit" className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors duration-300 font-bold shadow-lg shadow-cyan-500/50">
                  Register Dimension C-137
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-cyan-300">
                  Already a citizen of the multiverse?{" "}
                  <button onClick={toggleAuthMode} className="text-yellow-300 hover:underline font-bold">
                    Login now
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

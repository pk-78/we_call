// import React, { useState, useEffect, useContext } from "react";
// import PostImageCard from "../components/PostImageCard";
// import { FaPlus } from "react-icons/fa6";
// import ImageUpload from "../components/ImageUpload";
// import { GiCrossedBones } from "react-icons/gi";
// import UserContext from "../context/UserContext";
// import NotLoggedIn from "../components/NotLoggedIn";
// import SinglePost from "../components/SinglePost";
// import axios from "axios";
// import { url } from "../url/url";
// import { FcDataRecovery } from "react-icons/fc";
// import PostImageCardSkeleton from "../skeleton/PostImageCardSkeleton";

// export default function Post() {
//   const [buttonClick, setButtonClick] = useState("follow");
//   const [viewSinglePost, setViewSinglePost] = useState(null);
//   const [createPost, setCreatePost] = useState(false);
//   const [postIdArray, setPostIdArray] = useState(null);
//   const [myPostData, setMyPostData] = useState(null);
//   const [allPostData, setAllPostData] = useState(null);
//   const [followPostData, setFollowPostData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const {
//     isLoggedIn,
//     setIsLoggedIn,
//     notLoggedInPage,
//     setNotLoggedInPage,
//     id,
//     userDetail,
//   } = useContext(UserContext);
//   const isUser = localStorage.getItem("isUser");
//   console.log(isUser);
//   console.log(userDetail?.otherProfile?.following);
//   //  setPostIdArray(userDetail.posts);
//   useEffect(() => {
//     if (createPost || viewSinglePost) {
//       // Lock the scroll when the modal is open
//       document.body.style.overflow = "hidden";
//     } else {
//       // Unlock the scroll when the modal is closed
//       document.body.style.overflow = "auto";
//     }

//     // Clean up by resetting the overflow when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [createPost, viewSinglePost]);

//   useEffect(() => {
//     // setPostIdArray(userDetail?.posts);
//     // console.log(postIdArray)

//     const myPostDataFunc = async () => {
//       const response = await axios.get(`${url}/api/user/getPostByUserId/${id}`);
//       // console.log(response);
//       const sorted = response?.data?.posts?.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setMyPostData(sorted);

//       // console.log(myPostData);
//     };

//     const allPostDataFunc = async () => {
//       const response = await axios.get(`${url}/api/user/getAllPost`);
//       // console.log(response);
//       const sorted = response?.data?.posts?.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );

//       setAllPostData(sorted);
//       // console.log(allPostData);
//     };

//     const followPostDataFunc = async () => {
//       const response = await Promise.all(
//         userDetail?.otherProfile?.following?.map((id) =>
//           axios.get(`${url}/api/user/getPostByUserId/${id}`)
//         )
//       );

//       // console.log(response)
//       const data = response.map((res) => res?.data?.posts);
//       const other = [];

//       // Use forEach() instead of map()
//       data?.forEach((d) => d?.forEach((m) => other.push(m)));

//       console.log(other);
//       const sorted = other.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );

//       setFollowPostData(sorted);

//       // console.log(data);
//     };
//     setLoading(true);

//     myPostDataFunc();
//     allPostDataFunc();
//     followPostDataFunc();
//     setLoading(false);
//   }, [userDetail]);

//   // if (loading) {
//   //   return <PostImageCardSkeleton />;
//   // }

//   return (
//     <div className="relative md:px-28 md:py-10 my-5 bg-gray-50">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="md:text-3xl pl-5 font-bold text-gray-800">Posts</h1>
//         {isLoggedIn && (
//           <div className="space-x-4 pr-4">
//             {/* Follow Button */}
//             <button
//               onClick={() => {
//                 console.log("Follow button clicked");
//                 setButtonClick("follow");
//               }}
//               className={`md:px-4 px-2 py-1 md:text-base text-sm  ${
//                 buttonClick === "follow"
//                   ? "bg-teal-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               } font-semibold rounded-lg hover:bg-teal-600 hover:text-white shadow-md focus:outline-none`}
//             >
//               Follow
//             </button>

//             {/* All Button */}
//             <button
//               onClick={() => {
//                 console.log("Follow button clicked");
//                 setButtonClick("all");
//               }}
//               className={`md:px-4 px-2 py-1 md:text-base text-sm  ${
//                 buttonClick === "all"
//                   ? "bg-teal-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               } font-semibold rounded-lg hover:bg-teal-600 hover:text-white shadow-md focus:outline-none`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => {
//                 console.log("Follow button clicked");
//                 setButtonClick("my");
//               }}
//               className={`md:px-4 px-2 py-1 md:text-base text-sm  ${
//                 buttonClick === "my"
//                   ? "bg-teal-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               } font-semibold rounded-lg hover:bg-teal-600 hover:text-white shadow-md focus:outline-none`}
//             >
//               My
//             </button>

//             {/* Create Post Button */}
//             {isUser === "false" && (
//               <button
//                 onClick={() => {
//                   console.log("Create Post button clicked");
//                   setCreatePost(true);
//                   //   setButtonClick("createpost");
//                 }}
//                 className={`md:px-4 px-2 py-1 md:text-base text-sm    font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-teal-600 hover:text-white shadow-md  focus:outline-none`}
//               >
//                 <span className="flex items-center gap-2">
//                   <FaPlus className="mt-0" />
//                   Create Post
//                 </span>
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Posts Grid */}
//       <div>
//         {loading ? (
//           // Show 6 skeleton cards while loading
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {Array.from({ length: 6 }).map((_, idx) => (
//               <div key={idx}>
//                 <PostImageCardSkeleton />
//               </div>
//             ))}
//           </div>
//         ) : buttonClick === "all" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-auto">
//             {allPostData?.map((data, _id) => (
//               <div key={_id}>
//                 <PostImageCard
//                   data={data}
//                   setViewSinglePost={setViewSinglePost}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : buttonClick === "follow" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {followPostData?.map((data, _id) => (
//               <div key={_id}>
//                 <PostImageCard
//                   data={data}
//                   setViewSinglePost={setViewSinglePost}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {myPostData?.map((data, _id) => (
//               <div key={_id}>
//                 <PostImageCard
//                   data={data}
//                   setViewSinglePost={setViewSinglePost}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Image Upload Modal */}
//       {createPost && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="relative bg-white rounded-lg p-4">
//             <button
//               onClick={() => {
//                 setCreatePost(false);
//               }}
//               className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//             >
//               <GiCrossedBones size={24} />
//             </button>
//             <ImageUpload id={id} />
//           </div>
//         </div>
//       )}
//       {viewSinglePost && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="relative bg-white rounded-lg p-4">
//             <button
//               onClick={() => {
//                 setViewSinglePost(null);
//               }}
//               className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//             >
//               <GiCrossedBones size={24} />
//             </button>
//             <SinglePost viewSinglePost={viewSinglePost} />
//           </div>
//         </div>
//       )}
//       {notLoggedInPage && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="relative bg-white rounded-lg p-4">
//             <button
//               onClick={() => {
//                 setNotLoggedInPage(false);
//               }}
//               className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//             >
//               <GiCrossedBones size={24} />
//             </button>
//             <NotLoggedIn />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useContext } from "react";
import PostImageCard from "../components/PostImageCard";
import { FaPlus } from "react-icons/fa6";
import ImageUpload from "../components/ImageUpload";
import { GiCrossedBones } from "react-icons/gi";
import UserContext from "../context/UserContext";
import NotLoggedIn from "../components/NotLoggedIn";
import SinglePost from "../components/SinglePost";
import axios from "axios";
import { url } from "../url/url";
import PostImageCardSkeleton from "../skeleton/PostImageCardSkeleton";

export default function Post() {
  const [tab, setTab] = useState("follow");
  const [viewSinglePost, setViewSinglePost] = useState(null);
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState({
    my: [],
    all: [],
    follow: [],
  });
  const [loading, setLoading] = useState(true);

  const {
    isLoggedIn,
    notLoggedInPage,
    setNotLoggedInPage,
    id,
    userDetail,
  } = useContext(UserContext);

  const isUser = localStorage.getItem("isUser");
  console.log(posts)

  useEffect(() => {
    document.body.style.overflow = createPost || viewSinglePost ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [createPost, viewSinglePost]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [myPostsRes, allPostsRes, followPostsRes] = await Promise.all([
          axios.get(`${url}/api/user/getPostByUserId/${id}`),
          axios.get(`${url}/api/user/getAllPost`),
          Promise.all(
            userDetail?.otherProfile?.following?.map((fId) =>
              axios.get(`${url}/api/user/getPostByUserId/${fId}`)
            ) || []
          ),
        ]);

        const my = myPostsRes.data.posts || [];
        const all = allPostsRes.data.posts || [];
        const follow = followPostsRes.flatMap((res) => res.data.posts || []);

        const sortByDate = (arr) =>
          arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts({
          my: sortByDate(my),
          all: sortByDate(all),
          follow: sortByDate(follow),
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userDetail) fetchData();
  }, [userDetail, id]);

  const renderPosts = () => {
    const current = posts[tab] || [];

    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-12">
          {Array.from({ length: 6 }).map((_, idx) => (
            <PostImageCardSkeleton key={idx} />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mx-0 mx-12">
        {current?.length<1?<div className="flex justify-center w-full items-center h-52 text-xl"><h2>There is no post right now Please follow more people to see the post</h2></div>:current.map((data, index) => (
          <PostImageCard
            key={index}
            data={data}
            setViewSinglePost={setViewSinglePost}
          />
        ))}
      </div>
    );
  };

  const TabButton = ({ label, value }) => (
    <button
      onClick={() => setTab(value)}
      className={`md:px-4 px-2 py-1 md:text-base text-sm font-semibold rounded-lg shadow-md focus:outline-none ${
        tab === value
          ? "bg-teal-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-teal-600 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative md:px-28 md:py-10 my-5 bg-gray-50 lg:mb-10 mb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl pl-5 font-bold text-gray-800">Posts</h1>
        {isLoggedIn && (
          <div className="space-x-4 pr-4">
            <TabButton label="Follow" value="follow" />
            <TabButton label="All" value="all" />
            {isUser=== "false" && <TabButton label="My" value="my" />}
            {isUser === "false" && (
              <button
                onClick={() => setCreatePost(true)}
                className="md:px-4 px-2 py-1 md:text-base text-sm font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-teal-600 hover:text-white shadow-md focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <FaPlus />
                  Create Post
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Posts */}
      {renderPosts()}

      {/* Modals */}
      {createPost && (
        <Modal onClose={() => setCreatePost(false)}>
          <ImageUpload id={id} />
        </Modal>
      )}

      {viewSinglePost && (
        <Modal onClose={() => setViewSinglePost(null)}>
          <SinglePost viewSinglePost={viewSinglePost} />
        </Modal>
      )}

      {notLoggedInPage && (
        <Modal onClose={() => setNotLoggedInPage(false)}>
          <NotLoggedIn />
        </Modal>
      )}
    </div>
  );
}

// Reusable Modal component
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="relative bg-white rounded-lg p-4 max-h-screen overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-3 text-red-600 hover:text-red-800"
      >
        <GiCrossedBones size={24} />
      </button>
      {children}
    </div>
  </div>
);


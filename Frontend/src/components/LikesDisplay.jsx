import { useState } from "react";

const LikesDisplay = ({ likedUsers }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="font-dolce text-sm relative">
      {likedUsers.length === 0 ? (
        "Be the first to like..."
      ) : (
        <>
          Liked by {likedUsers[0].owner.username}
          {likedUsers.length > 1 && ` and ${likedUsers[1].owner.username}`}
          {likedUsers.length > 2 && (
            <>
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-500 ml-1 underline"
              >
                and others
              </button>
              {showAll && (
                <div className="mt-3 bg-gray-100 p-2 rounded shadow-lg absolute left-0 max-h-32 overflow-y-auto">
                  {likedUsers.slice(2).map((user, index) => (
                    <div key={index}>{user.owner.username}
                    <span className="ml-2">{user.createdAt.split("T")[0]}</span>
                    <hr />
                </div>
                  ))}
                  
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LikesDisplay;

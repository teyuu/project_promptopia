"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, index }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <motion.div
      className="prompt_card "
      initial={{
        opacity: 0,
        y: "100%",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.3 },
      }}
      viewport={{ once: true }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col ">
            <Link
              href={`/profile/${post.creator?._id}?name=${post.creator?.username}`}
            >
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator?.username}
              </h3>
            </Link>
            <p className="font-inter text-sm text-gray-500">
              {post.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            {" "}
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            {" "}
            Delete
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PromptCard;

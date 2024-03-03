import PromptCard from "./PromptCard";
import {motion, AnimatePresence} from 'framer-motion'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
    
      <div className='mt-10 prompt_layout'>
        <AnimatePresence>

        {data.map((post, index) => (
          
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            index={index}
          />
        ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Profile;
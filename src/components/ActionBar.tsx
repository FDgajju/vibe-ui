import { MessageCircle, Send } from "lucide-react";
import type React from "react";
import ActionButton from "./ActionButton";
import { GoHeart, GoHeartFill } from "react-icons/go";

type ActionBarProps = {
  likes?: number;
  comments?: number;
  isReacted?: boolean;
  onLike?: () => Promise<void>;
};

const ActionBar: React.FC<ActionBarProps> = ({
  likes = 0,
  comments = 0,
  isReacted = false,
  onLike,
}) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-4">
        <ActionButton
          icon={
            isReacted ? (
              <GoHeartFill className="w-5 text-red-500 h-5" />
            ) : (
              <GoHeart className="w-5 h-5" />
            )
          }
          label={likes}
          onClick={onLike}
          className="hover:text-red-500"
        />

        <ActionButton
          icon={<MessageCircle className="w-5 h-5" />}
          label={comments}
          onClick={() => console.log("Comment clicked!")}
          className="hover:text-blue-500"
        />

        <ActionButton
          icon={<Send className="w-5 h-5" />}
          onClick={() => console.log("Share clicked!")}
          className="hover:text-green-500"
        />
      </div>
    </div>
  );
};

export default ActionBar;

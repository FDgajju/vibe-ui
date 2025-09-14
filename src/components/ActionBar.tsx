import { MessageCircle, Send } from "lucide-react";
import type React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import ActionButton from "./ActionButton";

type ActionBarProps = {
  likes?: number;
  comments?: number;
  isReacted?: boolean;
  onLike?: () => Promise<void>;
  commentClick?: () => void;
};

const ActionBar: React.FC<ActionBarProps> = ({
  likes = 0,
  comments = 0,
  isReacted = false,
  onLike,
  commentClick,
}) => {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Event handling is managed by parent component
    // biome-ignore lint/a11y/useKeyWithClickEvents: Event handling is managed by parent component
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <ActionButton
            icon={
              isReacted ? (
                <GoHeartFill className="w-5 text-error h-5" />
              ) : (
                <GoHeart className="w-5 h-5" />
              )
            }
            label={likes}
            onClick={onLike}
            className="hover:text-error"
          />

          <ActionButton
            icon={<MessageCircle className="w-5 h-5" />}
            label={comments}
            onClick={commentClick}
            className="hover:text-secondary-color"
          />

          <ActionButton
            icon={<Send className="w-5 h-5" />}
            onClick={() => console.log("Share clicked!")}
            className="hover:text-success"
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;

import { Heart, MessageCircle, Send } from "lucide-react";
import type React from "react";
import ActionButton from "./ActionButton";

type ActionBarProps = {
  likes?: number;
  comments?: number;
};

const ActionBar: React.FC<ActionBarProps> = ({ likes = 0, comments = 0 }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-4">
        <ActionButton
          icon={<Heart className="w-5 h-5" />}
          label={likes}
          onClick={() => console.log("Liked!")}
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

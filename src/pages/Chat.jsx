import React, { useEffect, useState, useRef } from "react";
import { FaList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Header from "../components/Header";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  add_customer_friend,
  messageClear,
  send_message,
  updateMessage,
} from "../store/reducers/chatReducer";
import LoaderOverlay from "../components/LoaderOverlay";
import { toast } from "react-hot-toast";
import { socket } from "../utils/utils";

const Chat = () => {
  const scrollRef = useRef();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    currentFd,
    MyFriends,
    fd_messages,
    loader,
    successMessage,
    errorMessage,
  } = useSelector((state) => state.chat);
  const [show, setShow] = useState(false);
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);

  useEffect(() => {
    if (userInfo?.id) {
      socket.emit("add_customer", userInfo.id, userInfo);
    }
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(
        add_customer_friend({
          sellerId: sellerId || "",
          customerId: userInfo.id,
        })
      );
    }
  }, [dispatch, sellerId, userInfo]);

  const [text, setText] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        send_message({
          customerId: userInfo?.id,
          text,
          sellerId,
          name: userInfo?.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceiverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers); 
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fd_messages[fd_messages.length - 1]); // last message
      dispatch(messageClear());
    }
  }, [dispatch, successMessage]);

  useEffect(() => {
    if (receiverMessage) {
      if (
        sellerId === receiverMessage.senderId &&
        userInfo.id === receiverMessage.receiverId
      ) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send a message");
        dispatch(messageClear());
      }
    }
    }
,[receiverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fd_messages]);

  return (
    <>
      <Header />
      <div className="px-2 lg:px-7 py-2">
        {loader && <LoaderOverlay />}
        <div className="w-full bg-zinc-50 dark:bg-zinc-800 my-6 lg:my-0 p-4 rounded-lg border-2 dark:border-zinc-600 h-[calc(100vh-140px)]">
          <div className="w-full h-full relative flex">
            <div
              className={`w-[280px] h-full absolute z-10 ${
                show ? "left-0" : "-left-[336px]"
              } md:relative md:left-0 transition-all`}
            >
              <div className="w-full h-[calc(100vh-177px)] bg-zinc-100 dark:bg-zinc-700 md:bg-transparent overflow-y-auto">
                <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3">
                  <h2 className="text-zinc-900 dark:text-zinc-50 mt-2">
                    Sellers
                  </h2>
                  <span
                    onClick={() => setShow(!show)}
                    className="block cursor-pointer md:hidden text-zinc-900 dark:text-zinc-50"
                  >
                    <IoClose />
                  </span>
                </div>
                {MyFriends.length > 0 ? (
                  MyFriends.map((f, i) => (
                    <Link to={`/chat/${f.fdId}`} key={i}>
                      <div
                        className={`h-[60px] flex justify-start gap-2 my-2 items-center bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-500 ${
                          pathname === `/chat/${f.fdId}`
                            ? "bg-zinc-200 dark:bg-zinc-400"
                            : ""
                        } p-2 rounded-md cursor-pointer`}
                      >
                        <div className="relative">
                          <img
                            className="w-[38px] h-[38px] border-2 max-w-[38px] p-[2px] rounded-full"
                            src={f.image}
                            alt={f.name}
                          />
                          {Array.isArray(activeSeller) &&
                            activeSeller.some((c) => c.sellerId === f.fdId) && (
                              <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                            )}
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {f.name}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-zinc-900 dark:text-zinc-50">
                    No sellers found
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-[calc(100%-280px)] md:pl-4">
              <div className="flex justify-between items-center">
                {currentFd ? (
                  <div className="flex justify-start items-center gap-3">
                    <div className="relative">
                      <img
                        className="w-[38px] h-[38px] border-2 max-w-[38px] p-[2px] rounded-full"
                        src={currentFd?.image}
                      />
                      {Array.isArray(activeSeller) &&
                        activeSeller.some(
                          (c) => c.sellerId === currentFd.fdId
                        ) && (
                          <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                        )}
                    </div>
                    <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {currentFd?.name}
                    </h2>
                  </div>
                ) : (
                  ""
                )}
                <div
                  onClick={() => setShow(!show)}
                  className="flex w-[35px] md:hidden h-[35px] rounded-md bg-zinc-200 dark:bg-zinc-600 justify-center items-center text-zinc-900 dark:text-zinc-50"
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
              {currentFd ? (
                <>
                  <div className="py-4">
                    <div className="bg-zinc-200 dark:bg-zinc-700 h-[calc(100vh-290px)] rounded-lg p-3 overflow-y-auto">
                      {fd_messages.length > 0 ? (
                        fd_messages.map((m, i) => {
                          const isReceiver = currentFd?.fdId === m?.receiverId; // customer message
                          return (
                            <div
                              key={i}
                              ref={scrollRef}
                              className={`w-full flex ${
                                isReceiver ? "justify-end" : "justify-start"
                              } items-center`}
                            >
                              <div className="flex gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                {isReceiver && (
                                  <div className="flex justify-center items-start flex-col w-full bg-blue-600 text-white font-semibold py-1 px-2 rounded-md">
                                    <span>{m?.message}</span>
                                  </div>
                                )}
                                <div>
                                  <img
                                    className="w-[38px] h-[38px] border-2 rounded-full max-w-[38px] p-[3px]"
                                    src={
                                      isReceiver
                                        ? "/images/user.png"
                                        : currentFd?.image
                                    }
                                    alt="User"
                                  />
                                </div>
                                {!isReceiver && (
                                  <div className="flex justify-center items-start flex-col w-full bg-zinc-300 dark:bg-zinc-600 text-zinc-900 dark:text-zinc-50 font-semibold py-1 px-2 rounded-md">
                                    <span>{m?.message}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center text-zinc-900 dark:text-zinc-50">
                          No conversation yet!
                        </div>
                      )}
                    </div>
                  </div>
                  <form onClick={send} className="flex gap-3 w-full">
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      type="text"
                      className="w-full dark:bg-zinc-700 dark:text-zinc-100 outline-none py-2 px-3 rounded-full"
                      placeholder="Type a message..."
                    />
                    <button
                      type="submit"
                      className="py-2 px-5 bg-blue-600 text-white font-semibold rounded-full"
                    >
                      Send
                    </button>
                  </form>
                </>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h2 className="text-zinc-900 dark:text-zinc-50 md:text-xl font-semibold">
                    Please select a seller to start chatting
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Chat;

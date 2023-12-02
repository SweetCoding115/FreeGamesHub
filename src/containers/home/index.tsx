import { Button } from "@nextui-org/react";
import { FaWindows, FaFirefoxBrowser, FaGamepad } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  SwiperSlider,
  NewGamesAddedCard,
  MostPlayedGamesCard,
  TopPicksCard,
  MostPlayedGamesSkeleton,
  NewGameAddedSkeleton
} from "../../components";
import { useGetAllGamesQuery, useGetPopularGamesQuery, Game } from "../../services"
import { useMemo } from "react";
import { SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion"

const stagger = 0.25;
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const Home = () => {
  const { data: allGames, isLoading } = useGetAllGamesQuery();
  const { data: popularGames, isFetching } = useGetPopularGamesQuery();

  const newGames = useMemo(() => {
    if (!allGames) return
    const gamesCopy = [...allGames];
    
    const sortedGames: Game[] = gamesCopy.sort((a: Game, b: Game) => {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    });

    return sortedGames.slice(0, 15);
  }, [allGames]);

  return (
    <div className="top-section">
      <section
        className="bg-center bg-cover bg-no-repeat py-4 sm:py-14"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80)), url(/bg-2.webp)"
        }}
      >
        <div className="container mx-auto flex items-center justify-center flex-col">
          <div className="text-center max-w-[700px]">
            <h1 className="sm:text-4xl text-3xl mb-3 sm:mb-5 font-semibold text-white">
              Hunt Down the Ultimate <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent font-bold">Free-to-Play</span> Gaming Experiences!
            </h1>
            <p className="mb-5 sm:text-[16px] text-[15px]">
              Embark on a quest for the best free-to-play thrills! Discover diverse digital realms, each offering exciting adventures. Unleash the <span className="bg-gradient-to-r from-danger to-warning bg-clip-text text-transparent font-semibold">ultimate gaming experiences</span> and let the quest begin!
            </p>
            <p className="sm:text-3xl text-2xl mb-6 font-bold text-danger">
              Choose your platform
            </p>
            <div className="flex justify-center gap-6">
              <Button
                color="primary"
                variant="ghost"
                className="font-bold gap-1"
                size="lg"
                startContent={<FaWindows size={18} />}
                as={Link}
                to="/games?platform=pc"
              >
                Windows
              </Button>
              <Button
                color="secondary"
                variant="ghost"
                className="font-bold gap-1"
                size="lg"
                startContent={<FaFirefoxBrowser size={18} />}
                as={Link}
                to="/games?platform=browser"
              >
                Browser
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container !py-10">
        <div className="flex justify-between items-center mb-2">
          <h4 className="sm:text-3xl text-2xl">
            <span className="bg-gradient-to-r from-danger to-warning bg-clip-text text-transparent font-bold">
              Recently Added
            </span>
          </h4>
          <Button
            endContent={<MdNavigateNext size={22} />}
            color="primary"
            variant="light"
            className="font-semibold px-1 gap-0"
            as={Link}
            to="/games?sortby=recently_added"
          >
            View All
          </Button>
        </div>
        <SwiperSlider effect="coverflow">
          {
            isLoading ? (
              [1, 2, 3, 4, 5, 6].map((item, index) => (
                <SwiperSlide key={item}>
                  <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: index * stagger,
                      ease: "easeInOut",
                      duration: 0.5,
                    }}
                    viewport={{ amount: 0 }}
                  >
                    <NewGameAddedSkeleton />
                  </motion.div>
                </SwiperSlide>
              ))
            ) : (
              newGames?.map((game: Game, index: number) => (
                <SwiperSlide key={game.id}>
                  <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: index * stagger,
                      ease: "easeInOut",
                      duration: 0.5,
                    }}
                    viewport={{ amount: 0 }}
                  >
                    <NewGamesAddedCard game={game} />
                  </motion.div>
                </SwiperSlide>
              ))
            )
          }

        </SwiperSlider>
      </section >

      <section className="dark-bg-2">
        <div className="container !py-10 pt-15">
          <div className="flex justify-between items-center mb-2">
            <h4 className="sm:text-3xl text-2xl">
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent font-bold">
                Popular Games
              </span>
            </h4>
            <Button
              endContent={<MdNavigateNext size={22} />}
              color="primary"
              variant="light"
              className="font-semibold px-1 gap-0"
              as={Link}
              to="/games?sortby=popularity"
            >
              View All
            </Button>
          </div>
          <SwiperSlider effect="slide">
            {
              isFetching ? (
                [1, 2, 3, 4, 5, 6].map((item, index) => (
                  <SwiperSlide key={item}>
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: index * stagger,
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                      viewport={{ amount: 0 }}
                    >
                      <MostPlayedGamesSkeleton />
                    </motion.div>
                  </SwiperSlide>
                ))
              ) : (
                popularGames?.slice(0, 15)?.map((game: Game, index: number) => (
                  <SwiperSlide key={game.id}>
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: index * stagger,
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                      viewport={{ amount: 0 }}
                    >
                      <MostPlayedGamesCard game={game} />
                    </motion.div>
                  </SwiperSlide>
                ))
              )
            }

          </SwiperSlider>
        </div>
      </section>

      <section className="container !py-10 pt-15">
        <div className="flex justify-between items-center mb-5">
          <h4 className="sm:text-3xl text-2xl">
            <span className="bg-gradient-to-r from-danger to-warning bg-clip-text text-transparent font-bold">
              Community Recommendations
            </span>
          </h4>
        </div>
        <div className="flex justify-center gap-10 flex-wrap sm:flex-nowrap md:justify-between">
          <TopPicksCard game={newGames && newGames[newGames.length - 1]} />
          <TopPicksCard game={newGames && newGames[newGames.length - 2]} />
        </div>
      </section>

      <section
        className="bg-top bg-cover bg-no-repeat py-4 sm:py-14 mt-10"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(/bg.webp)"
        }}
      >
        <div className="container mx-auto">
          <div className="py-24 flex flex-col sm:flex-row sm:items-start items-center mx-auto">
            <h5
              className="text-large sm:pr-16 mb-6 sm:mb-0 font-medium title-font text-white text-center sm:text-left"
            >
              Uncertain about your next gaming adventure? Explore our <br /> <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent font-bold">exquisite collection of games</span> and discover the ideal match for your gaming desires!
            </h5>
            <Button
              endContent={<FaGamepad size={22} />}
              color="primary"
              variant="ghost"
              className="font-semibold px-3 gap-2"
              as={Link}
              to="/games"
              size="lg"
            >
              View All
            </Button>
          </div>
        </div>
      </section>
    </div >
  )
}
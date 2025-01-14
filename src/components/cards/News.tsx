import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { News } from "../../utils";

interface Props {
    news: News;
}

export const NewsCard = (props: Props) => {
    const news = props.news;

    return (
        <Card
            isPressable
            className="bg-transparent rounded cursor-pointer hover:scale-105 transition-400"
            as="a"
            href={news?.article_url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <CardHeader className="p-0">
                <Image
                    className="rounded w-full object-cover"
                    src={news?.main_image || news?.thumbnail}
                    alt={news?.title}
                    classNames={{
                        wrapper: "!max-w-full",
                    }}
                />
            </CardHeader>
            <CardBody className="p-0 mt-3 px-1">
                <h5 className="text-lg text-color-2 font-bold title-font mb-1 line-clamp-2">
                    {news?.title}
                </h5>
                <p className="leading-relaxed text-tiny text-color-3 line-clamp-3">
                    {news?.short_description}
                </p>
            </CardBody>
        </Card>
    );
};

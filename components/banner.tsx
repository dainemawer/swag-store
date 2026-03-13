import { getPromotions } from "@/lib/promotions";
import Container from "./container";

export default async function Banner() {
    const { data: promotion } = await getPromotions();

    if (!promotion) return null;

    return (
        <div className="bg-black py-4">
            <Container>
                <p className="text-white text-center font-medium">
                    {promotion.title} - {promotion.description} Code: <span className="font-mono uppercase">{promotion.code}</span>
                </p>
            </Container>
        </div>
    );
}

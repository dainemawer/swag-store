import Container from "./container";

export default function Banner() {
    return (
        <div className="bg-black py-4">
            <Container>
                <p className="text-white text-center font-medium">
                    Bundle and Save - Buy any hoodie + hat combo and save 10% automatically. Code: <span className="font-mono uppercase">BUNDLE10</span>
                </p>
            </Container>
        </div>
    );
}

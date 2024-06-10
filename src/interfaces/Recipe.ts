export default interface Recipe {
    _id: string,
    title: string;
    author: string;
    category: string;
    description: string;
    ingridients: string[];
    instructions: string[];
    image: string;
    reviews: any[];
}

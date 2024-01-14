import { TodoContainer } from "@/components/AllSection/Home/TodoContainer";
import { Container } from "@/components/reusable/Container";

const Home = () => {
  return (
    <Container>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold my-10 text-center">My Tasks</h1>
        <TodoContainer />
      </div>
    </Container>
  );
};

export default Home;

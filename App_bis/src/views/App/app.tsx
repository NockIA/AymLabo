import { SignIn } from "@/components/auth/signin"
import { Nav } from "@/components/nav/nav"

 const App:React.FC = () => {
    return (
        <main>
            <Nav/>
            <SignIn/>
        </main>
    )
}

export default App
import {Routes,Route} from 'react-router-dom'
import Home from './home';
import Signup from './signup';
import Login from './login';
import {Nav,Navbar,Container} from 'react-bootstrap'
import Diary from './diary.js';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Yourdiary from './yourdiary.js';
import {clearLoginStatus} from '../slices/userSlice';
import {RiBookLine} from 'react-icons/ri'
function Header() {

  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
    (state)=>state.user
  )
  
  let dispatch=useDispatch();
  let navigate=useNavigate()
  const userLogout=()=>{
    localStorage.clear();
    dispatch(clearLoginStatus());
    navigate("/login");
  }
  return (
    <div className='container'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='navbar-fixed-top'>
  <Container>
  <Navbar.Brand href="/"><RiBookLine/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    {isSuccess!==true?(
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/signup">Sign up</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav>):
      (
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={userLogout}>Logout</Nav.Link>
        </Nav>)
    }
  </Navbar.Collapse>
  </Container>
</Navbar>

<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/diary" element={<Diary/>}>
          <Route path="yourdiary" element={<Yourdiary/>}/>
        </Route>
  </Routes>
    </div>
  );
}

export default Header;

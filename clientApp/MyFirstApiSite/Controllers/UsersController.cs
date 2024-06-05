using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Entities;
using Services;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using AutoMapper;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFirstApiSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IUserService _userService;
        IMapper _mapper;
        private readonly ILogger<UsersController> _logger;
        public UsersController(IUserService userService, IMapper mapper , ILogger<UsersController> logger)
        {
            _userService = userService;
            _mapper = mapper;
            _logger = logger;
        }
        
        // GET: api/<AuthController>
        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AuthController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            User user =await _userService.GetUserById(id);
            if (user!=null)
               return Ok(user);
            return BadRequest();
        }


        // POST api/<AuthController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] User user)
        {
            int goodPass = _userService.CheckPass(user.Password);
            if (goodPass<=2)
                return BadRequest();
            User newUser =await _userService.AddUser(user);
            return CreatedAtAction(nameof(Get), new { id = newUser.UserId }, newUser);

        }

        // POST api/<AuthController>
        [HttpPost]

        [Route("login")]
        public async Task<ActionResult<User>> login([FromBody] UserLoginDTO u)
        {
           
            User user = _mapper.Map<UserLoginDTO, User>(u);
            _logger.LogInformation($"Loggin attemped with user name,{user.Email} and password {user.Password}");
            User newUser =await _userService.login(user);
            if (user != null)
            {
                return Ok(newUser);

            }
                
            return Unauthorized();

        }

        // PUT api/<AuthController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Put(int id, [FromBody] User u)
        {
            int goodPass = _userService.CheckPass(u.Password);
            if (goodPass<=2)
                return BadRequest();
            User user =await _userService.UpdateUser(u, id);
            if (user != null)
                return Ok(u);
            return BadRequest();

        }

        // POST api/<AuthController>
        [HttpPost]
        [Route("checkPassword")]
        public int checkPassword([FromBody] String password)
        {
            int goodPass = _userService.CheckPass(password);
            return goodPass;
 
        }

        // DELETE api/<AuthController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

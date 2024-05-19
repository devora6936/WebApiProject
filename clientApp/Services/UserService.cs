using Entities;
using Repositories;
//using Zxcvbn;

namespace Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<User> GetUserById(int id)
        {
            return await _userRepository.GetUserById(id);
        }

        public  int CheckPass(String password)
        {
            var result = Zxcvbn.Core.EvaluatePassword(password);
            return result.Score;
        }

        public async Task<User> AddUser(User user)
        {
            return await _userRepository.AddUser(user);
        }

        public async Task<User> UpdateUser(User u, int id)
        {
            return await _userRepository.UpdateUser(u, id);
        }

        public async Task<User> login(User u)
        {
            return await _userRepository.login(u);
        }

    }
}

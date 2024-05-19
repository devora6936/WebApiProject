using Entities;
using Repositories;

namespace Services
{
    public class OrderService : IOrderService
    {
        private IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<Order> AddOrder(Order order)
        {
            return await _orderRepository.AddOrder(order);
        }


    }
}

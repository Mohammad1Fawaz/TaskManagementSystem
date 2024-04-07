
namespace TaskManagementSystem.Server.RealTime
{
    public class ConnectionManager
    {
        public readonly Dictionary<string, List<string>> _userConnections = new Dictionary<string, List<string>>();

        public void AddConnection(string userId, string connectionId)
        {
            lock (_userConnections)
            {
                if (!_userConnections.ContainsKey(userId))
                {
                    _userConnections[userId] = new List<string>();
                }

                _userConnections[userId].Add(connectionId);
            }
        }

        public List<string> GetConnections(string userId)
        {
            lock (_userConnections)
            {
                if (_userConnections.ContainsKey(userId))
                {
                    return _userConnections[userId];
                }
                else
                {
                    return new List<string>();
                }
            }
        }

        public void RemoveConnection(string connectionId)
        {
            lock (_userConnections)
            {
                foreach (var userId in _userConnections.Keys)
                {
                    _userConnections[userId].Remove(connectionId);
                }
            }
        }
    }
}

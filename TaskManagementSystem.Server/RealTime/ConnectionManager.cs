
namespace TaskManagementSystem.Server.RealTime
{
    public class ConnectionManager
    {
        public readonly Dictionary<int, List<string>> _userConnections = new Dictionary<int, List<string>>();

        public void AddConnection(int userId, string connectionId)
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

        public List<string> GetConnections(int userId)
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

        public void RemoveConnection(int userId, string connectionId)
        {
            lock (_userConnections)
            {
                if (_userConnections.ContainsKey(userId))
                {
                    _userConnections[userId].Remove(connectionId);
                    if (_userConnections[userId].Count == 0)
                    {
                        _userConnections.Remove(userId);
                    }
                }
            }
        }


        public bool ConnectionExists(int userId, string connectionId)
        {
            if (_userConnections.ContainsKey(userId))
            {
                return _userConnections[userId].Contains(connectionId);
            }

            return false;
        }

        public List<int> GetAllUserIdsWithConnections()
        {
            lock (_userConnections)
            {
                return _userConnections.Keys.ToList();
            }
        }
    }
}

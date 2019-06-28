package client;

import java.util.HashMap;

public interface ClientService {
	void join(ClientVO vo);
	boolean id_check(String id);
	ClientVO loginRequest(HashMap<String, String> map);
}

package client;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImple implements ClientService {
	@Autowired private ClientDAO dao;

	@Override
	public void join(ClientVO vo) {
		dao.join(vo);
	}

	@Override
	public boolean id_check(String id) {
		return dao.id_check(id);
	}

	@Override
	public ClientVO loginRequest(HashMap<String, String> map) {
		return dao.loginRequest(map);
	}
}

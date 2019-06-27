package client;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ClientDAO {
	@Autowired
	private SqlSession sql;

	public void join(ClientVO vo) {
		sql.insert("client-mapper.join", vo);
	}

	public boolean id_check(String id) {
		
		if (sql.selectOne("client-mapper.id_check", id) != null) {
			// 중복일때
			return true;
		} else {
			// 중복이 아닐 때
			return false;
		}

	}
}

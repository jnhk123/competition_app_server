package com.competition.appServer;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import client.ClientService;
import client.ClientVO;

@Controller
public class ClientController {
	@Autowired private ClientService service;
	
	@RequestMapping(value = {"/loginRequest"}, method= {RequestMethod.POST})
	public String loginRequest(HttpServletRequest req, Model model) {
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("id", id);
		map.put("pw", pw);
		
		model.addAttribute("result",service.loginRequest(map));
		
		return "android/loginRequestJson";
	}
	
	//ȸ������ ȭ������ �ѱ��
	@RequestMapping(value="/android_join", method = RequestMethod.GET)
	public String go_join_page() {
		return "android/join";
	}
	
	//ȸ������
	@RequestMapping("/join.jo") @ResponseBody
	public String join(ClientVO vo) {
		System.out.println("join");
		service.join(vo);
		return "success";
	}
	
	//���̵� �ߺ�üũ
	@RequestMapping("/id_check") @ResponseBody
	public String id_check(@RequestParam String id) {
		if(service.id_check(id)) {
			//�ߺ��϶�
			return "true";
		}else {
			//�ߺ��� �ƴҶ�
			return "false";
		}
	}
}

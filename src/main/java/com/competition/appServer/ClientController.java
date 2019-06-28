package com.competition.appServer;

import java.util.HashMap;

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
	
	@RequestMapping(value = {"/loginRequest"}, method= {RequestMethod.GET, RequestMethod.POST})
	public String loginRequest(@RequestParam String id, @RequestParam String pw, Model model) {
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("id", id);
		map.put("pw", pw);
		
		model.addAttribute("result",service.loginRequest(map));
		
		return "android/loginRequestJson";
	}
	
	//회원가입 화면으로 넘기기
	@RequestMapping("/android_join")
	public String go_join_page() {
		return "android/join";
	}
	
	//회원가입
	@RequestMapping("/join.jo") @ResponseBody
	public String join(ClientVO vo) {
		System.out.println("join");
		service.join(vo);
		return "success";
	}
	
	//아이디 중복체크
	@RequestMapping("/id_check") @ResponseBody
	public String id_check(@RequestParam String id) {
		if(service.id_check(id)) {
			//중복일때
			return "true";
		}else {
			//중복이 아닐때
			return "false";
		}
	}
}

